import React, { createContext, useContext, useState } from 'react';

const productContext = createContext();

export const useProducts = () => {
    const context = useContext(productContext);
    if (!context) {
        throw new Error('useProducts must be used within ProductsProvider');
    }
    return context;
};

const mockProducts = [
    {
        id: 1,
        name: 'Classic T-Shirt',
        description: 'Comfortable cotton t-shirt',
        category: 'Clothing',
        price: 19.99,
        inventory: 100
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        description: 'Noise-cancelling wireless headphones',
        category: 'Electronics',
        price: 149.99,
        inventory: 25
    },
    {
        id: 3,
        name: 'Coffee Mug',
        description: 'Ceramic coffee mug with handle',
        category: 'Home',
        price: 12.99,
        inventory: 50
    }
];

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(mockProducts);
    const [loading, setLoading] = useState(false);

    return (
        <productContext.Provider value={{
            products,
            setProducts,
            loading,
            setLoading
        }}>
            {children}
        </productContext.Provider>
    );
};