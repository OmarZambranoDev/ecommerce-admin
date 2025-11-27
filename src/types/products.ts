// src/types/products.ts

export interface BaseProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  basePrice: number;
}

export interface SimpleProduct extends BaseProduct {
  hasVariants: false;
  inventory: number;
  variants: [];
}

export interface ProductWithVariants extends BaseProduct {
  hasVariants: true;
  variants: Variant[];
}

export type Product = SimpleProduct | ProductWithVariants;

export interface Variant {
  id: string;
  productId: number;
  sku: string;
  attributes: {
    size?: string;
    color?: string;
    material?: string;
  };
  priceAdjustment: number;  // >= 0
  inventory: number;
}

// Type guards
export const isProductWithVariants = (product: Product): product is ProductWithVariants => {
  return product.hasVariants && product.variants.length > 0;
};

export const isSimpleProduct = (product: Product): product is SimpleProduct => {
  return !product.hasVariants;
};

// Helper functions
export const getProductTotalInventory = (product: Product): number => {
  if (isProductWithVariants(product)) {
    return product.variants.reduce((sum, v) => sum + v.inventory, 0);
  } else {
    return product.inventory;
  }
};

export const getVariantPrice = (product: BaseProduct, variant: Variant): number => {
  return product.basePrice + variant.priceAdjustment;
};