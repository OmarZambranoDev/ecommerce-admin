import React from 'react';
import { ProductsProvider } from './contexts/ProductContext'
import ProductList from './components/ProductList.jsx'
import './styles/App.css';

function App() {
    return (
        <ProductsProvider>
            <div className="app">
                <header className="app-header">
                    <h1>E-Commerce Admin Dashboard</h1>
                </header>
                <main className="app-main">
                    <ProductList />
                </main>
            </div>
        </ProductsProvider>
    );
}

export default App;