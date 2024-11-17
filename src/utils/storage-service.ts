import Product from '../types/product';
import { ProductWithQuantity } from '../types/product';

export default class StorageService {
    // Favorites
    static getFavorites(): Product[] {
        const favorites = localStorage.getItem('favorites');
        return favorites ? (JSON.parse(favorites) as Product[]) : [];
    }

    static setFavorites(favorites: Product[]) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    static removeFavorite(id: number) {
        const favorites = this.getFavorites();
        const index = favorites.findIndex((f) => f.id === id);
        if (index !== -1) {
            favorites.splice(index, 1);
            this.setFavorites(favorites);
        }
    }

    static addFavorite(product: Product) {
        const favorites = this.getFavorites();
        const index = favorites.findIndex((f) => f.id === product.id);
        if (index === -1) {
            favorites.push(product);
            this.setFavorites(favorites);
        }
    }

    static isFavorite(id: number) {
        const favorites = this.getFavorites();
        return !!favorites.find((f) => f.id === id);
    }

    // Cart
    static getCart(): ProductWithQuantity[] {
        const cart = localStorage.getItem('cart');
        return cart ? (JSON.parse(cart) as ProductWithQuantity[]) : [];
    }

    static setCart(cart: ProductWithQuantity[]) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static removeCartItem(id: number) {
        const cart = this.getCart();
        const index = cart.findIndex((c) => c.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            this.setCart(cart);
        }
    }

    static addCartItem(product: ProductWithQuantity) {
        const cart = this.getCart();
        const index = cart.findIndex((c) => c.id === product.id);
    
        if (index === -1) {
            // If product doesn't exist, add a new entry with the quantity
            cart.push({ ...product });
        } else {
            // If product exists, update the quantity
            cart[index].quantity = product.quantity;
        }
    
        this.setCart(cart);
    }
    

    static updateCartItemQuantity(id: number, quantity: number) {
        const cart = this.getCart();
        const index = cart.findIndex((c) => c.id === id);

        if (index !== -1) {
            cart[index].quantity = quantity;
            if (cart[index].quantity <= 0) {
                // Remove the item if quantity becomes zero or less
                cart.splice(index, 1);
            }
            this.setCart(cart);
        }
    }

    static isCartItem(id: number) {
        const cart = this.getCart();
        return !!cart.find((c) => c.id === id);
    }
}
