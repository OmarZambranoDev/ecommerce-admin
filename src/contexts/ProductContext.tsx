import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/products';
import { mockProducts } from '../mocks/products';

interface ProductsContextType {
    products: Product[];
    setProducts: (products: Product[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const ProductsContext = createContext < ProductsContextType | undefined > (undefined);

export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within ProductsProvider');
    }
    return context;
};

interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [products, setProducts] = useState < Product[] > (mockProducts);
    const [loading, setLoading] = useState(false);

    return (
        <ProductsContext.Provider value={{
            products,
            setProducts,
            loading,
            setLoading
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
