import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sportshop.xo.je/api/products', // Laravel standard local port
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const fetchProducts = () => api.get('');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const fetchCategories = () => api.get('/categories');
export const placeOrder = (orderData) => api.post('/orders', orderData);

export default api;
