import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import BulkEditor from './BulkEditor';

const ProductList = () => {
    const { products, setProducts } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProductsUpdate = (updatedFilteredProducts) => {
        const updatedFullProducts = products.map(product => {
            const updatedProduct = updatedFilteredProducts.find(p => p.id === product.id);
            return updatedProduct || product;
        });

        setProducts(updatedFullProducts);
    };

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

            <BulkEditor products={filteredProducts} onProductsUpdate={handleProductsUpdate}/>
        </div>
    );
};

export default ProductList;