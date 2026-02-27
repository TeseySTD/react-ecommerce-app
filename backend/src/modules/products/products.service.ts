import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async getAllProducts() {
        return this.productsRepository.findAll();
    }

    async getProductById(id: number) {
        const product = await this.productsRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async createProduct(dto: CreateProductDto) {
        return this.productsRepository.create(dto);
    }

    async deleteProduct(id: number) {
        const isDeleted = await this.productsRepository.delete(id);
        if (!isDeleted) {
            throw new NotFoundException(`Product with ID ${id} cannot be deleted because it does not exist`);
        }
        return { message: 'Product successfully deleted' };
    }
}