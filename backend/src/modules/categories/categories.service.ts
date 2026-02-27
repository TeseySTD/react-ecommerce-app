import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './repositories/categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) { }

    async getAllCategories() {
        return this.categoriesRepository.findAll();
    }

    async getCategoryById(id: number) {
        const category = await this.categoriesRepository.findById(id);
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async createCategory(dto: CreateCategoryDto) {
        return this.categoriesRepository.create(dto);
    }

    async updateCategory(id: number, dto: Partial<CreateCategoryDto>) {
        const updatedCategory = await this.categoriesRepository.update(id, dto);
        if (!updatedCategory) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return updatedCategory;
    }

    async deleteCategory(id: number) {
        const isDeleted = await this.categoriesRepository.delete(id);
        if (!isDeleted) {
            throw new NotFoundException(`Category with ID ${id} cannot be deleted because it does not exist`);
        }
        return { message: 'Category successfully deleted' };
    }
}