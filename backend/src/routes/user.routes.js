import { Router } from 'express';
import {
    addAddress,
    addWishlist,
    getAddresses,
    getWishlist,
    deleteAddress,
    removeFromWishlist,
    updateAddress
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post('/address', addAddress);
router.get('/address', getAddresses);
router.put('/address/:id', updateAddress);
router.delete('/address/:id', deleteAddress);

router.post('/wishlist', addWishlist);
router.get('/wishlist', getWishlist);
router.delete('/wishlist/:productId', removeFromWishlist);

export default router;