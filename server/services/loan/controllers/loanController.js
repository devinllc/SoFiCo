const Loan = require('../models/Loan');
const User = require('../../auth/models/User');
const Agent = require('../../agent/models/Agent');
const { verifyToken, authorize } = require('../../auth/middleware/auth');

// Apply for a loan
const applyLoan = async (req, res) => {
  try {
    const { amount, purpose } = req.body;
    const userId = req.user._id;

    // Check if user has any pending loans
    const existingLoan = await Loan.findOne({
      user: userId,
      status: { $in: ['APPLIED', 'APPROVED'] }
    });

    if (existingLoan) {
      return res.status(400).json({
        error: 'You already have a pending or approved loan'
      });
    }

    // Create new loan application
    const loan = new Loan({
      user: userId,
      amount,
      purpose,
      status: 'APPLIED',
      history: [{
        status: 'APPLIED',
        date: new Date(),
        note: 'Loan application submitted'
      }]
    });

    await loan.save();

    res.status(201).json({
      message: 'Loan application submitted successfully',
      loan
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user's loans
const getUserLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(loans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get loan details
const getLoanDetails = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.loanId)
      .populate('user', 'firstName lastName email phone')
      .populate('agent', 'user');

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    // Check if user has permission to view this loan
    if (loan.user._id.toString() !== req.user._id.toString() &&
        req.user.role !== 'ADMIN' &&
        (!loan.agent || loan.agent.user.toString() !== req.user._id.toString())) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Approve loan (admin/agent only)
const approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { note } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (loan.status !== 'APPLIED') {
      return res.status(400).json({ error: 'Loan is not in applied status' });
    }

    // Update loan status
    loan.status = 'APPROVED';
    loan.history.push({
      status: 'APPROVED',
      date: new Date(),
      note: note || 'Loan approved'
    });

    // If approved by agent, assign the loan
    if (req.user.role === 'AGENT') {
      const agent = await Agent.findOne({ user: req.user._id });
      if (agent) {
        loan.agent = agent._id;
        agent.assignedLoans.push(loan._id);
        await agent.save();
      }
    }

    await loan.save();

    res.json({
      message: 'Loan approved successfully',
      loan
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reject loan (admin/agent only)
const rejectLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { note } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (loan.status !== 'APPLIED') {
      return res.status(400).json({ error: 'Loan is not in applied status' });
    }

    loan.status = 'REJECTED';
    loan.history.push({
      status: 'REJECTED',
      date: new Date(),
      note: note || 'Loan rejected'
    });

    await loan.save();

    res.json({
      message: 'Loan rejected successfully',
      loan
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all loans (admin only)
const getAllLoans = async (req, res) => {
  try {
    const { status, agent } = req.query;
    const query = {};

    if (status) query.status = status;
    if (agent) query.agent = agent;

    const loans = await Loan.find(query)
      .populate('user', 'firstName lastName email phone')
      .populate('agent', 'user')
      .sort({ createdAt: -1 });

    res.json(loans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update loan status
const updateLoanStatus = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { status, note } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    // Validate status transition
    const validTransitions = {
      'APPROVED': ['DISBURSED'],
      'DISBURSED': ['CLOSED'],
      'REJECTED': ['APPLIED'] // Allow reapplication
    };

    if (!validTransitions[loan.status]?.includes(status)) {
      return res.status(400).json({
        error: `Invalid status transition from ${loan.status} to ${status}`
      });
    }

    loan.status = status;
    loan.history.push({
      status,
      date: new Date(),
      note: note || `Loan status updated to ${status}`
    });

    await loan.save();

    res.json({
      message: 'Loan status updated successfully',
      loan
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  applyLoan,
  getUserLoans,
  getLoanDetails,
  approveLoan,
  rejectLoan,
  getAllLoans,
  updateLoanStatus
}; 