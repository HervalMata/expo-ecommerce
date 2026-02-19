import { Router } from 'express';
import { 
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();
router.use(protectRoute);

router.post('/', addToCart);
router.get('/', getCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeFromCart);
router.delete('/', clearCart);

export default router;