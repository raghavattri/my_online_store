import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../features/cartSlice';
import { getData } from '../features/cartSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', imageUrl: '' });
  const productsData = useSelector(state => state.cart.items);
  const [products, setProducts] = useState([]);
  const [updateFields, setUpdateFields] = useState({});
  const [finalData, setFinalData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(getData());
        const data = actionResult.payload;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleUpdateProduct = (productId) => {

    const productToUpdate = products.find(product => product._id === productId);
    setUpdateFields(productToUpdate);
    setFinalData(productToUpdate);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFinalData(prevState => ({ ...prevState, [name]: value }));
  };


  const handleFinalUpdate = () => {
    dispatch(updateProduct({ id: updateFields._id, finalData }));
    setUpdateFields({});
    setFinalData({});
  };

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ name: '', category: '', price: '', stock: '', imageUrl: '' });
  };

  const handleDeleteProduct = (productId) => {
    // dispatch(deleteProduct(productId));
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Admin Dashboard</h2>
      <div className='admin-dashboard'>
        <div className='admin-all-products'>
          <h3>Products</h3>
          <div className='admin-products-list'>
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">Price: ${product.price}</p>
                  <div style={{ display: 'flex', gap: '.5rem' }}>
                    Color: {product.variants.map(item => { return <p key={Math.random()}>{item.color}</p> })}
                  </div>

                  <button onClick={() => handleUpdateProduct(product._id)}>Update</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='admin-add-product'>
          <div>
            <h3>Add New Product</h3>
            <input
              type="text"
              placeholder='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({
                ...newProduct,
                name: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='category'
              value={newProduct.category}
              onChange={(e) => setNewProduct({
                ...newProduct,
                category: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({
                ...newProduct,
                price: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='stock pieces'
              value={newProduct.stock}
              onChange={(e) => setNewProduct({
                ...newProduct,
                stock: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='imageUrl'
              value={newProduct.imageUrl}
              onChange={(e) => setNewProduct({
                ...newProduct,
                imageUrl: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='color'
              value={newProduct.variants?.[0]?.color || ''}
              onChange={(e) => setNewProduct({
                ...newProduct,
                variants: [{ ...newProduct.variants?.[0], color: e.target.value }]
              })}
            />
            <input
              type="text"
              placeholder='size'
              value={newProduct.variants?.[0]?.size || ''}
              onChange={(e) => setNewProduct({
                ...newProduct,
                variants: [{ ...newProduct.variants?.[0], size: e.target.value }]
              })}
            />

            <button onClick={handleAddProduct}>Add Product</button>
          </div>
          <div>
            {
              updateFields && Object.keys(updateFields).length > 0 && (
                <div>
                  <p>Edit Card</p>
                  <input type="text" placeholder='name' name="name" value={finalData.name || updateFields.name} onChange={onInputChange} />
                  <input type="text" placeholder='category' name="category" value={finalData.category || updateFields.category} onChange={onInputChange} />
                  <input type="text" placeholder='price' name="price" value={finalData.price || updateFields.price} onChange={onInputChange} />
                  <input type="text" placeholder='stock' name="stock" value={finalData.stock || updateFields.stock} onChange={onInputChange} />
                  <input type="text" placeholder='imageUrl' name="imageUrl" value={finalData.imageUrl || updateFields.imageUrl} onChange={onInputChange} />
                  <button onClick={handleFinalUpdate}>Update</button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
