import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.route('/').post(registerUser).get(getUsers);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser)
// router.route('/profile').get(getUserProfile).put(updateUserProfile);

// router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

router
  .route('/profile')
  .get(protect, getUserProfile) 
  .put(protect, updateUserProfile); //Oberve how middleware functions are being called right before the backend functions.
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;