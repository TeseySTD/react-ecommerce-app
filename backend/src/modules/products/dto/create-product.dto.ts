export class CreateProductDto {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
}