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
