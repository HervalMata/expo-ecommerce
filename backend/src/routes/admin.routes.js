import { Router } from "express";
import { 
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
    getAllCustomers,
    getDashboardStats
} from "../controllers/admin.controller.js";
import { protectRoute, adminOnly } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(protectRoute);

router.post('/products', upload.array('images', 3), createProduct);
router.get('/products', getAllProducts);
router.put('/products/:id', upload.array('images', 3), updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/orders', getAllOrders);
router.put('/orders/:orderId/status', updateOrderStatus);
router.get('/customers', getAllCustomers);
router.get('/stats', getDashboardStats);

export default router;