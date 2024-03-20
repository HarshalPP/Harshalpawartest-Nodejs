import { signup,login,logout } from "../controller/usercontroller.js";

// Path: Backend/src/router/userRoutes.js

export const userService={
   signup: async (req, res) => {
        // Call the middleware to handle the operation
        await handleServiceMiddleware(req, res, signup);
    },
    login: async (req, res) => {
        // Call the middleware to handle the operation
        await handleServiceMiddleware(req, res, login);
    },
    logout: async (req, res) => {
        // Call the middleware to handle the operation
        await handleServiceMiddleware(req, res, logout);
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


