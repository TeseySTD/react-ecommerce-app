import Category from './category';

export default class Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];

    constructor(
        id: number,
        title: string,
        price: number,
        description: string,
        category: Category,
        images?: string[]
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.images = images ?? ['https://placehold.co/50'];
    }
}

// Новий тип для продуктів з кількістю
export class ProductWithQuantity extends Product {
    quantity: number;

    constructor(
        id: number,
        title: string,
        price: number,
        description: string,
        category: Category,
        quantity: number,
        images?: string[]
    ) {
        super(id, title, price, description, category, images);
        this.quantity = quantity;
    }
}
