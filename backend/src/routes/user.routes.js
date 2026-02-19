import { Router } from 'express';
import {
    addAddress,
    addWishlist,
    getAddresses,
    getWishlist,
    removeAddress,
    removeFromWishlist,
    updateAddress
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post('/address', addAddress);
router.get('/address', getAddresses);
router.put('/address/:id', updateAddress);
router.delete('/address/:id', removeAddress);

router.post('/wishlist', addWishlist);
router.get('/wishlist', getWishlist);
router.delete('/wishlist/:productId', removeFromWishlist);

export default router;