import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req)=>{
      if(localStorage.getItem("profile")){
            req.headers.Authorization = `Bearer ${
                  JSON.parse(localStorage.getItem("profile")).token
            }`
      }
      return req;
})

export const getData = createAsyncThunk("cart/getData", async (payload,{ rejectWithValue }) => {
  try {
    const res = await axios.get("http://localhost:5000/api/products");
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})
export const addProduct = createAsyncThunk("cart/addProduct", async (payload,{ rejectWithValue }) => {
  try {

    const res = await API.post("/api/products", payload);
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    currentCategory: 'all',
    categories: [],
    showItems: [],
    availableColors: [],
    totalProducts: 0,
    loading: false,
  },
  reducers: {
    getInitialData: (state, action) => {
      console.log(state.items)
      
    },

    updateList: (state, action) => {
      state.currentCategory = action.payload.value;
      let filteredProducts;
      if (action.payload.type === 'category') {
        filteredProducts = state.items.filter(product =>
          product.category.toLowerCase() === action.payload.value.toLowerCase()
        );
      } else {
        filteredProducts = state.items.filter(product =>
          product.variants.some(variant =>
            variant.color &&
            variant.color.toLowerCase() === action.payload.value.toLowerCase()
          )
        );
        
      }
      state.showItems = filteredProducts;
    },

  },
  extraReducers(builder) {
    builder.addCase(
      getData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        
        state.items = action.payload;
        
        const uniqueCategories = action.payload.reduce((categories, product) => {
          if (product.category) {
            const categoryIndex = categories.findIndex(cat => cat.name === product.category.toLowerCase());
            if (categoryIndex !== -1) {
              categories[categoryIndex].number++;
            } else {
              categories.push({ name: product.category.toLowerCase(), number: 1 });
            }
          }
          return categories;
        }, []);
    
        const uniqueColors = action.payload.reduce((availableColors, product) => {
          product.variants.forEach(variant => {
            if (variant.color) {
              const colorIndex = availableColors.findIndex(col => col.name === variant.color.toLowerCase());
              if (colorIndex !== -1) {
                availableColors[colorIndex].number++;
              } else {
                availableColors.push({ name: variant.color.toLowerCase(), number: 1 });
              }
            }
          });
          return availableColors;
        }, []);
        
        state.categories = uniqueCategories;
        state.availableColors = uniqueColors;
        state.totalProducts = action.payload.length;
        state.loading = false;
        state.showItems = action.payload.map(data =>{
          state.showItems.push(data);
        })
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProduct.pending, (state, action)=>{
        state.loading =true
      })
      .addCase(addProduct.fulfilled, (state, action)=>{
        state.pending =false;
        console.log(action.payload);
      })
      .addCase(addProduct.rejected, (state, action)=>{
        state.loading = false;
      })
     }
});

export const { getInitialData, updateList } = cartSlice.actions;

export default cartSlice.reducer;