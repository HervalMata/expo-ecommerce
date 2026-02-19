import { Order } from "../models/order.model";
import { Review } from "../models/review.model";
import { Product } from "../models/product.model";

export async function createOrder(req, res) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { orderItems, shippingAddress, paymentResult, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order items are required' });
        }

        for (const item of orderItems) {
            if (!item.productId || !item.name || !item.price || !item.quantity || !item.image) {
                return res.status(400).json({ message: 'Each order item must have productId, name, price, quantity, and image' });
            }
            const product = await Product.findById(item.product._id);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.product._id} not found` });
            }
            if (item.quantity > product.stock) {
                return res.status(400).json({ message: `Not enough stock for product ${product.name}` });
            }
        }

        const order = await Order.create({
            user: user._id,
            clerkId: user.clerkId,
            orderItems,
            shippingAddress,
            paymentResult,
            totalPrice
        });

        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
        }

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export async function getUserOrders(req, res) {
    try {
        const orders = await Order.find({ clerkId: req.user.clerkId })
        .populate('orderItems.productId')
        .sort({ createdAt: -1 });

        const orderIds = orders.map(order => order._id);
        const reviews = await Review.find({ orderId: { $in: orderIds } });
        const reviewedOrderIds = reviews.map(review => review.orderId.toString());

        const ordersWithReviewStatus = await Promise.all(orders.map(async (order) => {
            return {
                ...order.toObject(),
                hasReviewed: reviewedOrderIds.has(order._id.toString()),
            };
        }));

        res.status(200).json({ orders: ordersWithReviewStatus});
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}
