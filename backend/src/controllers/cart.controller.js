import { Cart } from "../models/cart.model";
import { Product } from "../models/product.model";

export async function getCart(req, res) {
    try {
        let cart = await Cart.findOne({ clerkId: req.user.clerkId }).populate('items.product');
        if (!cart) {
            const user = req.user;
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            cart = await Cart.create({ 
                user: user._id,
                clerkId: req.user.clerkId, 
                items: [] 
            });
        }
        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export async function addToCart(req, res) {
    try {
        const { productId, quantity = 1 } = req.body;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }
        let cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            const user = req.user;
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            cart = await Cart.create({ 
                user: req.user._id,
                clerkId: req.user.clerkId, 
                items: [] 
            });
        }
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + 1;
            if (newQuantity > product.stock) {
                return res.status(400).json({ message: 'Not enough stock available' });
            }
            existingItem.quantity = newQuantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export async function updateCartItem(req, res) {
    try {
        const { productId } = req.params;
        const { quantity } = req.body; 
        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }
        const cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.status(200).json({ message: 'Cart item updated', cart });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export async function removeFromCart(req, res) {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export async function clearCart(req, res) {
    try {
        const cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = [];
        await cart.save();
        res.status(200).json({ message: 'Cart cleared', cart });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}