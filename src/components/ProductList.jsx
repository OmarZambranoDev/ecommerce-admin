import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import BulkEditor from './BulkEditor';

const ProductList = () => {
    const { products } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list">
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <BulkEditor products={filteredProducts} />
        </div>
    );
};

export default ProductList;