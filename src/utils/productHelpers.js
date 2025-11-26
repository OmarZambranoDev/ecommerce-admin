// Utility functions for product operations
export const updateProductPrices = (products) => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const updated = products.map(product => ({
                ...product,
                lastUpdated: new Date().toISOString()
            }));
            resolve(updated);
        }, 1000);
    });
};

export const validateProductPrice = (price) => {
    if (typeof price !== 'number') return false;
    if (price < 0) return false;
    if (price > 1000000) return false;
    return true;
};

export const formatProductPrice = (price) => {
    return `$${price.toFixed(2)}`;
};

export const calculatePriceChange = (oldPrice, newPrice) => {
    return ((newPrice - oldPrice) / oldPrice) * 100;
};

export const applyDiscount = (price, discountPercent) => {
    const discountAmount = price * (discountPercent / 100);
    return price - discountAmount;
};

export const getProductsByCategory = (products, category) => {
    return products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );
};

export const sortProducts = (products, sortBy, sortOrder = 'asc') => {
    return products.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'price') {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
};

export const searchProducts = (products, query) => {
    if (!query) return products;

    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
};