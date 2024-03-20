import {createPost,getAllPost,deletePost,updatePost} from '../controller/postController.js';
// Path: Backend/src/router/userRoutes.js

export const postService=
{
    createPost: async (req, res) => {
         // Call the middleware to handle the operation
         await handleServiceMiddleware(req, res, createPost);
     },
     getAllPost: async (req, res) => {
            // Call the middleware to handle the operation
            await handleServiceMiddleware(req, res, getAllPost);
        },
    deletePost: async (req, res) => {
        // Call the middleware to handle the operation
        await handleServiceMiddleware(req, res, deletePost);
    
    },
    updatePost: async (req, res) => {
        // Call the middleware to handle the operation
        await handleServiceMiddleware(req, res, updatePost);
    }
 }
 
 
 
 // Middleware to handle service operations
 const handleServiceMiddleware = async (req, res, operation) => {
     try {
         await operation(req, res);
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 }; 