import Category from '../types/category';
import Product from '../types/product';

export default class FakeStoreProvider {
    private static _productLink: string =
        'https://api.escuelajs.co/api/v1/products/';
    private static _categoryLink: string =
        'https://api.escuelajs.co/api/v1/categories/';

    public static async getProducts(): Promise<Product[]> {
        try {
            const response = await fetch(FakeStoreProvider._productLink);
            const data = await response.json();
            return data.map((product: Product) => {
                return new Product(
                    product.id,
                    product.title,
                    product.price,
                    product.description,
                    new Category(
                        product.category.id,
                        product.category.name,
                        product.category.image
                    ),
                    product.images
                );
            });
        } catch (error) {
            throw new Response('Error with fetching products: ' + error, {
                statusText: 'Error with fetching products: ' + error,
                status: 500
            });
        }
    }

    public static async getPaginatedProducts(
        limit: number,
        offset: number
    ): Promise<Product[]> {
        const products = await FakeStoreProvider.getProducts();
        return products.slice(offset, offset + limit);
    }

    public static async getProductById(id: number): Promise<Product | undefined> {
        const products = await FakeStoreProvider.getProducts();
        return products.find((product) => product.id == id);
    }
}
