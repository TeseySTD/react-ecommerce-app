import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsRepository {
    private products: Product[] = [
        {
            id: 1,
            title: 'Classic White T-Shirt',
            price: 25,
            description: 'A timeless classic for any wardrobe.',
            images: ['https://placeimg.com/640/480/any'],
            categoryId: 1,
        },
        {
            id: 2,
            title: 'Wireless Headphones',
            price: 150,
            description: 'High-quality sound with noise cancellation.',
            images: ['https://placeimg.com/640/480/tech'],
            categoryId: 2,
        },
    ];

    private currentId = 2;

    async findAll(): Promise<Product[]> {
        return this.products;
    }

    async findById(id: number): Promise<Product | undefined> {
        return this.products.find((p) => p.id === id);
    }

    async create(dto: CreateProductDto): Promise<Product> {
        const newProduct: Product = {
            id: ++this.currentId,
            ...dto,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    async delete(id: number): Promise<boolean> {
        const initialLength = this.products.length;
        this.products = this.products.filter((p) => p.id !== id);
        return this.products.length < initialLength;
    }
}