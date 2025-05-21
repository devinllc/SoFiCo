const Scheme = require('../models/Scheme');
const User = require('../../auth/models/User');
const { verifyToken, authorize } = require('../../auth/middleware/auth');

// Create new scheme
const createScheme = async (req, res) => {
  try {
    const { name, description, targetAmount, duration } = req.body;

    // Create new scheme
    const scheme = new Scheme({
      name,
      description,
      targetAmount,
      duration,
      creator: req.user._id,
      members: [req.user._id],
      status: 'PENDING',
      progress: 0,
      gamification: {
        points: 0,
        level: 1
      }
    });

    await scheme.save();

    res.status(201).json({
      message: 'Scheme created successfully',
      scheme
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Join scheme
const joinScheme = async (req, res) => {
  try {
    const { schemeId } = req.params;
    const scheme = await Scheme.findById(schemeId);

    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    if (scheme.status !== 'ACTIVE') {
      return res.status(400).json({ error: 'Scheme is not active' });
    }

    if (scheme.members.includes(req.user._id)) {
      return res.status(400).json({ error: 'Already a member of this scheme' });
    }

    scheme.members.push(req.user._id);
    await scheme.save();

    res.json({
      message: 'Joined scheme successfully',
      scheme
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Approve scheme (admin only)
const approveScheme = async (req, res) => {
  try {
    const { schemeId } = req.params;
    const scheme = await Scheme.findById(schemeId);

    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    if (scheme.status !== 'PENDING') {
      return res.status(400).json({ error: 'Scheme is not pending approval' });
    }

    scheme.status = 'ACTIVE';
    await scheme.save();

    res.json({
      message: 'Scheme approved successfully',
      scheme
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Dissolve scheme
const dissolveScheme = async (req, res) => {
  try {
    const { schemeId } = req.params;
    const scheme = await Scheme.findById(schemeId);

    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    // Only creator or admin can dissolve scheme
    if (scheme.creator.toString() !== req.user._id.toString() &&
        req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to dissolve scheme' });
    }

    scheme.status = 'DISSOLVED';
    await scheme.save();

    res.json({
      message: 'Scheme dissolved successfully',
      scheme
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add member to scheme
const addMember = async (req, res) => {
  try {
    const { schemeId } = req.params;
    const { userId } = req.body;

    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    // Only creator or admin can add members
    if (scheme.creator.toString() !== req.user._id.toString() &&
        req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to add members' });
    }

    if (scheme.members.includes(userId)) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    scheme.members.push(userId);
    await scheme.save();

    res.json({
      message: 'Member added successfully',
      scheme
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update scheme progress
const updateProgress = async (req, res) => {
  try {
    const { schemeId } = req.params;
    const { progress, points } = req.body;

    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    // Only creator or admin can update progress
    if (scheme.creator.toString() !== req.user._id.toString() &&
        req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to update progress' });
    }

    scheme.progress = progress;
    if (points) {
      scheme.gamification.points += points;
      // Update level based on points
      scheme.gamification.level = Math.floor(scheme.gamification.points / 100) + 1;
    }

    await scheme.save();

    res.json({
      message: 'Progress updated successfully',
      scheme
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get scheme details
const getSchemeDetails = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.schemeId)
      .populate('creator', 'firstName lastName email')
      .populate('members', 'firstName lastName email');

    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    res.json(scheme);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user's schemes
const getUserSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find({
      $or: [
        { creator: req.user._id },
        { members: req.user._id }
      ]
    })
    .populate('creator', 'firstName lastName email')
    .sort({ createdAt: -1 });

    res.json(schemes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all schemes (admin only)
const getAllSchemes = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const schemes = await Scheme.find(query)
      .populate('creator', 'firstName lastName email')
      .populate('members', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(schemes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createScheme,
  joinScheme,
  approveScheme,
  dissolveScheme,
  addMember,
  updateProgress,
  getSchemeDetails,
  getUserSchemes,
  getAllSchemes
}; 