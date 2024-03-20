import express from 'express';
import {postService} from '../services/postservices.js';
import {middlwareupdate} from '../middleware/token.js';
const router = express.Router();

router.post('/createPost', postService.createPost);
router.get('/getAllPost', postService.getAllPost);
router.delete('/deletePost/:id',middlwareupdate, postService.deletePost);
router.put('/updatePost/:id',middlwareupdate, postService.updatePost);


export default router;