import express from 'express';
import { 
  createDeposit, 
  getMyTransactions, 
  getAdminTransactions, 
  updateTransactionStatus 
} from '../controllers/transactionController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Tất cả route đều yêu cầu đăng nhập

router.route('/deposit')
  .post(createDeposit);

router.route('/me')
  .get(getMyTransactions);

router.route('/admin')
  .get(authorize('admin'), getAdminTransactions);

router.route('/admin/:id')
  .put(authorize('admin'), updateTransactionStatus);

export default router;
