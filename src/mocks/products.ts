import { Product, SimpleProduct, ProductWithVariants } from '../types/products';

export const mockProducts: Product[] = [
    // Simple product (no variants)
    {
        id: 1,
        name: 'Wireless Headphones',
        description: 'Noise-cancelling wireless headphones',
        category: 'Electronics',
        basePrice: 149.99,
        hasVariants: false,
        inventory: 25,
        variants: []
    },

    // Product with variants - T-Shirt
    {
        id: 2,
        name: 'Classic Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        category: 'Clothing',
        basePrice: 19.99,
        hasVariants: true,
        variants: [
            {
                id: 'tshirt-small-white',
                productId: 2,
                sku: 'TSHIRT-S-WHITE',
                attributes: { size: 'S', color: 'White' },
                priceAdjustment: 0,
                inventory: 15
            },
            {
                id: 'tshirt-medium-white',
                productId: 2,
                sku: 'TSHIRT-M-WHITE',
                attributes: { size: 'M', color: 'White' },
                priceAdjustment: 0,
                inventory: 20
            },
            {
                id: 'tshirt-large-white',
                productId: 2,
                sku: 'TSHIRT-L-WHITE',
                attributes: { size: 'L', color: 'White' },
                priceAdjustment: 0,
                inventory: 18
            },
            {
                id: 'tshirt-large-black',
                productId: 2,
                sku: 'TSHIRT-L-BLACK',
                attributes: { size: 'L', color: 'Black' },
                priceAdjustment: 2.00, // Premium for black
                inventory: 12
            }
        ]
    },

    // Simple product
    {
        id: 3,
        name: 'Ceramic Coffee Mug',
        description: '12oz ceramic mug with handle',
        category: 'Home',
        basePrice: 12.99,
        hasVariants: false,
        inventory: 50,
        variants: []
    },

    // Product with variants - Phone Case
    {
        id: 4,
        name: 'Smartphone Case',
        description: 'Protective case with raised bezels',
        category: 'Electronics',
        basePrice: 24.99,
        hasVariants: true,
        variants: [
            {
                id: 'case-iphone14-clear',
                productId: 4,
                sku: 'CASE-IP14-CLEAR',
                attributes: { size: 'iPhone 14', color: 'Clear' },
                priceAdjustment: 0,
                inventory: 30
            },
            {
                id: 'case-iphone14-black',
                productId: 4,
                sku: 'CASE-IP14-BLACK',
                attributes: { size: 'iPhone 14', color: 'Black' },
                priceAdjustment: 0,
                inventory: 25
            },
            {
                id: 'case-iphone15-clear',
                productId: 4,
                sku: 'CASE-IP15-CLEAR',
                attributes: { size: 'iPhone 15', color: 'Clear' },
                priceAdjustment: 5.00, // Newer model costs more
                inventory: 20
            },
            {
                id: 'case-iphone15-black',
                productId: 4,
                sku: 'CASE-IP15-BLACK',
                attributes: { size: 'iPhone 15', color: 'Black' },
                priceAdjustment: 5.00,
                inventory: 18
            }
        ]
    }
];