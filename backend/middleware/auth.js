import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Bảo vệ routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token từ Bearer token trong header
    token = req.headers.authorization.split(' ')[1];
  }

  // Kiểm tra token có tồn tại không
  if (!token) {
    return res.status(401).json({ success: false, message: 'Không có quyền truy cập route này' });
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Không có quyền truy cập route này' });
  }
};

// Cấp quyền theo role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Quyền của user '${req.user.role}' không được phép truy cập route này`
      });
    }
    next();
  };
};
