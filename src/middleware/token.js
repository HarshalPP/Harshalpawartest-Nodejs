import { Post } from '../models/post.js';
import { comments } from '../models/comments.js'; 

// Middleware for authorizing post actions
export const postMiddleware = async (req, res, next) => {
  try {
    const userId = req.headers['user-id']; 

    if (req.params.id) {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }


      if (post.author.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to edit/delete this post' });
      }
    }


    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Middleware for authorizing comment actions
export const commentMiddleware = async (req, res, next) => {
  try {
    const userId = req.headers['user-id']; 

    if (req.params.id) { 
      const commentId = req.params.id;

      const comment = await comments.findById(commentId);
      
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (comment.author.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to edit/delete this comment' });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
