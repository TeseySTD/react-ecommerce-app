import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesRepository {
    private categories: Category[] = [
        {
            id: 1,
            name: 'Clothes',
            image: 'https://placeimg.com/640/480/any',
        },
        {
            id: 2,
            name: 'Electronics',
            image: 'https://placeimg.com/640/480/tech',
        },
        {
            id: 3,
            name: 'Furniture',
            image: 'https://placeimg.com/640/480/arch',
        }
    ];

    private currentId = 3;

    async findAll(): Promise<Category[]> {
        return this.categories;
    }

    async findById(id: number): Promise<Category | undefined> {
        return this.categories.find((c) => c.id === id);
    }

    async create(dto: CreateCategoryDto): Promise<Category> {
        const newCategory: Category = {
            id: ++this.currentId,
            ...dto,
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    async update(id: number, dto: Partial<CreateCategoryDto>): Promise<Category | undefined> {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index === -1) return undefined;

        this.categories[index] = { ...this.categories[index], ...dto };
        return this.categories[index];
    }

    async delete(id: number): Promise<boolean> {
        const initialLength = this.categories.length;
        this.categories = this.categories.filter((c) => c.id !== id);
        return this.categories.length < initialLength;
    }
}