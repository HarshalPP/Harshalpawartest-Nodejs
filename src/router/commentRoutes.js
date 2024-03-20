import express from 'express';
import { commentService } from '../services/commentservices.js'
const router = express.Router();

// Create a new comment
router.post('/createComment',commentService.createComment);
router.get('/getAllComments',commentService.getAllComments);
router.get('/userswatchComments/:id',commentService.userswatchComments);
router.delete('/deleteComment/:id',commentService.deleteComment);
router.put('/updateComment/:id',commentService.updateComment);

export default router;