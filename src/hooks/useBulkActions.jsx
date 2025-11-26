import { useState } from 'react';
import { useProducts } from '../contexts/productContext';

export const useBulkActions = () => {
    const [loading, setLoading] = useState(false);
    const { products, setProducts } = useProducts();

    const bulkUpdate = async (productIds, updates) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedProducts = products.map(product =>
                productIds.includes(product.id)
                    ? { ...product, ...updates, updatedAt: new Date() }
                    : product
            );

            setProducts(updatedProducts);
            return { success: true, updated: productIds.length };
        } catch (error) {
            console.log('Bulk update error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const bulkDelete = async (productIds) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const remainingProducts = products.filter(
                product => !productIds.includes(product.id)
            );

            setProducts(remainingProducts);
            return { success: true, deleted: productIds.length };
        } catch (error) {
            console.log('Bulk delete error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        bulkUpdate,
        bulkDelete
    };
};