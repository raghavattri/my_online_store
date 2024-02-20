// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct  } from '../features/cartSlice';
import { getData } from '../features/cartSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', imageUrl: '' });
  const productsData = useSelector(state => state.cart.items);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(getData()).then(() => {
        console.log(productsData, "hi")
        setProducts(productsData);
    });
}, [dispatch]);


//   const handleUpdateProduct = (productId, updatedProductData) => {
//     dispatch(updateProduct({ id: productId, data: updatedProductData }));
//   };

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ name: '', category: '', price: '', stock: '', imageUrl: '' }); // Clear input fields after adding
  };

  const handleDeleteProduct = (productId) => {
    // dispatch(deleteProduct(productId));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Products</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <input placeholder='name' type="text" value={product.name} onChange={(e) => handleUpdateProduct(product.id, { name: e.target.value })} />
              <input placeholder='category' type="text" value={product.category} onChange={(e) => handleUpdateProduct(product.id, { category: e.target.value })} />
              <input placeholder='price' type="text" value={product.price} onChange={(e) => handleUpdateProduct(product.id, { price: e.target.value })} />
              <input placeholder='stock pieces' type="text" value={product.stock} onChange={(e) => handleUpdateProduct(product.id, { stock: e.target.value })} />
              <input placeholder='imageUrl' type="text" value={product.imageUrl} onChange={(e) => handleUpdateProduct(product.id, { imageUrl: e.target.value })} />
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add New Product</h3>
        <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="text" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
        <input type="text" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="text" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
        <input type="text" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
