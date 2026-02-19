import { requiredAuth } from "../utils/auth.utils.js";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectRoute = [
    requiredAuth(),
    async (req, res, next) => {
    
        try {
            const clerkId = req.auth().userId;
            if (!clerkId) {
                return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
            }
            const user = await User.findOne({ clerkId });
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
}];

export const adminOnly = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized - No user information' });
    }
    if (req.user.email !== ENV.ADMIN_EMAIL) {
        return res.status(403).json({ message: 'Forbidden - Admins access only' });
    }
    next();
}