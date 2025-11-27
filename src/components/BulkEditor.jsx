import React, { useState, useEffect } from 'react';
import { useBulkActions } from '../hooks/useBulkActions';
import { updateProductPrices } from '../utils/productHelpers';
import '../styles/BulkEditor.css';
import { getProductTotalInventory } from '../types/products';

const BulkEditor = ({ products, onProductsUpdate }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [priceUpdate, setPriceUpdate] = useState(0);
    const [updateType, setUpdateType] = useState('fixed');
    const [isLoading, setIsLoading] = useState(false);

    const { bulkUpdate, bulkDelete } = useBulkActions();

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(products.map(p => p.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleProductSelect = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const handlePriceUpdate = async () => {
        setIsLoading(true);

        try {
            const updatedProducts = products.map(product => {
                if (selectedProducts.includes(product.id)) {
                    let newPrice = product.price;

                    if (updateType === 'fixed') {
                        newPrice = priceUpdate;
                    } else if (updateType === 'percentage') {
                        newPrice = product.price * (1 + priceUpdate / 100);
                    }

                    return { ...product, price: Math.round(newPrice * 100) / 100 };
                }
                return product;
            });

            const result = await updateProductPrices(updatedProducts);
            onProductsUpdate(result);
            setSelectedProducts([]);
            setPriceUpdate(0);

        } catch (error) {
            console.error('Bulk update failed:', error);
            alert('Update failed: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selectedProducts.length} products?`)) {
            bulkDelete(selectedProducts);
            setSelectedProducts([]);
        }
    };

    useEffect(() => {
        setSelectedProducts([]);
    }, [products]);

    return (
        <div className="bulk-editor">
            <div className="bulk-header">
                <h2>Bulk Product Editor</h2>
                <div className="bulk-actions">
                    <span>{selectedProducts.length} products selected</span>
                    <button
                        onClick={handleBulkDelete}
                        disabled={selectedProducts.length === 0}
                    >
                        Delete Selected
                    </button>
                </div>
            </div>

            <div className="bulk-controls">
                <label>
                    <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedProducts.length === products.length}
                    />
                    Select All
                </label>

                <select
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value)}
                >
                    <option value="fixed">Fixed Price</option>
                    <option value="percentage">Percentage Change</option>
                </select>

                <input
                    type="number"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(parseFloat(e.target.value) || 0)}
                    placeholder={updateType === 'fixed' ? 'New price' : 'Percentage %'}
                />

                <button
                    onClick={handlePriceUpdate}
                    disabled={selectedProducts.length === 0 || isLoading}
                >
                    {isLoading ? 'Updating...' : 'Apply Price Update'}
                </button>
            </div>

            <div className="products-list">
                <div className="products-list-header">
                    <span></span>
                    <strong>Name</strong>
                    <strong>Base Price</strong>
                    <strong>Category</strong>
                    <strong>Inventory</strong>
                </div>

                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleProductSelect(product.id)}
                        />
                        <span>{product.name}</span>
                        <span>${product.basePrice.toFixed(2)}</span>
                        <span>{product.category}</span>
                        <span>Stock: {getProductTotalInventory(product)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BulkEditor;