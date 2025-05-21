const Agent = require('../models/Agent');
const User = require('../../auth/models/User');
const Loan = require('../../loan/models/Loan');
const { verifyToken, authorize } = require('../../auth/middleware/auth');

// Register new agent
const registerAgent = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if user exists and is not already an agent
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is already an agent
    const existingAgent = await Agent.findOne({ user: userId });
    if (existingAgent) {
      return res.status(400).json({ error: 'User is already an agent' });
    }

    // Create new agent
    const agent = new Agent({
      user: userId,
      performanceScore: 0,
      isActive: true
    });

    // Update user role to AGENT
    user.role = 'AGENT';
    await user.save();
    await agent.save();

    res.status(201).json({
      message: 'Agent registered successfully',
      agent: {
        id: agent._id,
        user: user.getPublicProfile(),
        performanceScore: agent.performanceScore
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get agent profile
const getAgentProfile = async (req, res) => {
  try {
    const agent = await Agent.findOne({ user: req.user._id })
      .populate('user', '-password')
      .populate('assignedLoans');

    if (!agent) {
      return res.status(404).json({ error: 'Agent profile not found' });
    }

    res.json(agent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Assign loan to agent
const assignLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const agentId = req.user._id;

    const agent = await Agent.findOne({ user: agentId });
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    // Check if loan is already assigned
    if (loan.agent) {
      return res.status(400).json({ error: 'Loan is already assigned to an agent' });
    }

    // Assign loan to agent
    loan.agent = agent._id;
    agent.assignedLoans.push(loan._id);
    
    await loan.save();
    await agent.save();

    res.json({
      message: 'Loan assigned successfully',
      loan,
      agent: {
        id: agent._id,
        assignedLoans: agent.assignedLoans
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get agent's assigned loans
const getAssignedLoans = async (req, res) => {
  try {
    const agent = await Agent.findOne({ user: req.user._id })
      .populate({
        path: 'assignedLoans',
        populate: {
          path: 'user',
          select: 'firstName lastName email phone'
        }
      });

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json(agent.assignedLoans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create user (by agent)
const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email or phone already exists'
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: 'USER',
      createdBy: req.user._id // Track which agent created this user
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get agent's created users
const getCreatedUsers = async (req, res) => {
  try {
    const users = await User.find({ createdBy: req.user._id })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update agent performance score
const updatePerformanceScore = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { score } = req.body;

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    agent.performanceScore = score;
    await agent.save();

    res.json({
      message: 'Performance score updated successfully',
      agent: {
        id: agent._id,
        performanceScore: agent.performanceScore
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerAgent,
  getAgentProfile,
  assignLoan,
  getAssignedLoans,
  createUser,
  getCreatedUsers,
  updatePerformanceScore
}; 