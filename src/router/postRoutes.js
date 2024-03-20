import express from 'express';
import {postService} from '../services/postservices.js';
import {postMiddleware} from '../middleware/token.js';
const router = express.Router();

router.post('/createPost', postService.createPost);
router.get('/getAllPost', postService.getAllPost);
router.delete('/deletePost/:id',postMiddleware, postService.deletePost);
router.put('/updatePost/:id',postMiddleware, postService.updatePost);


export default router;