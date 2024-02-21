import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css'; // Import CSS file for styling
import { getInitialData, getData } from "../features/cartSlice"

function ProductList({ onAddToCart }) {
    const cartItems = useSelector(state => state.cart.items);
    const showItems = useSelector(state => state.cart.showItems);
    const totalProducts = useSelector(state => state.cart.totalProducts);
    const reduxCurrentCategory = useSelector(state => state.cart.currentCategory);
    const categories = useSelector(state => state.cart.categories);
    
    const [displayItems, setDisplayItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    useEffect(async () => {  

        const fetchData = async () => {
            try {
                const actionResult = await dispatch(getData());
                const data = actionResult.payload;
                setDisplayItems(data); // Assuming payload is an array of items
            } catch (error) {
                // Handle error if necessary
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
      }, []);
    
    

    useEffect(() => {
        if (reduxCurrentCategory.toLowerCase() === 'all') {
            setDisplayItems(showItems);
        } else {
            setDisplayItems(showItems);
            console.log(displayItems)
        }
    }, [reduxCurrentCategory])


    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        console.log(searchTerm)
        setSearchTerm(searchTerm);
        if (searchTerm.length === 0) {
            setDisplayItems(cartItems);
        } else {
            console.log(cartItems)
            let filteredProducts = cartItems.filter(product =>
                product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );  
            console.log(filteredProducts)          
            setDisplayItems(filteredProducts);
        }
    };

    return (
        <div className="product-list-container">
            <h2>Products</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
                placeholder={`Search for all ${totalProducts} products...`}
            />
            <div className="product-grid">
                {displayItems.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-price">Price: ${product.price}</p>
                            <div style={{ display: 'flex', gap:'.5rem' }}>
                                Color: { product.variants.map(item => { return <p key={Math.random()}>{item.color}</p>})}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
