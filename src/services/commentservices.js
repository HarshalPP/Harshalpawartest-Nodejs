import { createComment,getAllComments, userswatchComments,deleteComment,updateComment} from "../controller/comments.js";

export const commentService={
    createComment: async (req, res) => {
        await handleServiceMiddleware(req, res, createComment);
    },
    getAllComments: async (req, res) => {
        await handleServiceMiddleware(req, res, getAllComments);
    },
    userswatchComments: async (req, res) => {
        await handleServiceMiddleware(req, res, userswatchComments);
    },
    deleteComment: async (req, res) => {
        await handleServiceMiddleware(req, res, deleteComment);
    },
    updateComment: async (req, res) => {
        await handleServiceMiddleware(req, res, updateComment);
    }

}

// Middleware to handle service operations
const handleServiceMiddleware = async (req, res, operation) => {
    try {
        await operation(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
