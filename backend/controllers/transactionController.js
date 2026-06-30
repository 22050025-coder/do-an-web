import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

// @desc    Tạo yêu cầu nạp tiền
// @route   POST /api/transactions/deposit
// @access  Private
export const createDeposit = async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Số tiền không hợp lệ' });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      amount,
      type: 'deposit',
      status: 'pending',
      description: description || 'Nạp tiền vào ví'
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Lấy lịch sử giao dịch của user hiện tại
// @route   GET /api/transactions/me
// @access  Private
export const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('course', 'title')
      .sort('-createdAt');
    res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Lấy tất cả yêu cầu nạp tiền (Admin)
// @route   GET /api/transactions/admin
// @access  Private/Admin
export const getAdminTransactions = async (req, res) => {
  try {
    // Chỉ lấy những giao dịch nạp tiền
    const transactions = await Transaction.find({ type: 'deposit' })
      .populate('user', 'name email')
      .sort('-createdAt');
    res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Duyệt / Từ chối yêu cầu nạp tiền
// @route   PUT /api/transactions/admin/:id
// @access  Private/Admin
export const updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'completed' hoặc 'rejected'
    
    if (!['completed', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ' });
    }

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy giao dịch' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Giao dịch này đã được xử lý rồi' });
    }

    transaction.status = status;
    await transaction.save();

    // Nếu duyệt, cộng tiền vào ví user
    if (status === 'completed' && transaction.type === 'deposit') {
      const user = await User.findById(transaction.user);
      user.balance += transaction.amount;
      await user.save();
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
