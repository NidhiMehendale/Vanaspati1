import axios from 'axios';

// Configure base URL for API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('nurseryUser') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock plant data for demo purposes
const mockPlants = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'Indoor Plants',
    price: 29.99,
    originalPrice: 39.99,
    description: 'A beautiful tropical plant with split leaves, perfect for indoor decoration.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    inStock: 15,
    careLevel: 'Easy',
    sunlight: 'Bright, indirect light',
    water: 'Weekly',
    size: 'Medium',
    features: ['Air Purifying', 'Low Maintenance', 'Pet Friendly'],
    rating: 4.5,
    reviews: 124
  },
  {
    id: 2,
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    category: 'Indoor Plants',
    price: 19.99,
    originalPrice: 24.99,
    description: 'Hardy and low-maintenance plant that thrives in low light conditions.',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop',
    inStock: 25,
    careLevel: 'Very Easy',
    sunlight: 'Low to bright light',
    water: 'Every 2-3 weeks',
    size: 'Medium',
    features: ['Air Purifying', 'Low Light', 'Drought Tolerant'],
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    category: 'Indoor Plants',
    price: 49.99,
    originalPrice: 59.99,
    description: 'Large, violin-shaped leaves make this plant a stunning focal point.',
    image: 'https://images.unsplash.com/photo-1463320898679-83d4d6a85b65?w=400&h=400&fit=crop',
    inStock: 8,
    careLevel: 'Moderate',
    sunlight: 'Bright, indirect light',
    water: 'Weekly',
    size: 'Large',
    features: ['Statement Plant', 'Air Purifying', 'Fast Growing'],
    rating: 4.2,
    reviews: 67
  },
  {
    id: 4,
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    category: 'Flowering Plants',
    price: 24.99,
    originalPrice: 29.99,
    description: 'Elegant flowering plant with white blooms and dark green leaves.',
    image: 'https://images.unsplash.com/photo-1586093218909-b72892ac7f9d?w=400&h=400&fit=crop',
    inStock: 20,
    careLevel: 'Easy',
    sunlight: 'Low to moderate light',
    water: 'Weekly',
    size: 'Medium',
    features: ['Flowering', 'Air Purifying', 'Low Light'],
    rating: 4.6,
    reviews: 103
  },
  {
    id: 5,
    name: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    category: 'Indoor Plants',
    price: 34.99,
    originalPrice: 44.99,
    description: 'Glossy, dark green leaves and easy care make this a popular choice.',
    image: 'https://images.unsplash.com/photo-1509423350716-97f2360af874?w=400&h=400&fit=crop',
    inStock: 12,
    careLevel: 'Easy',
    sunlight: 'Bright, indirect light',
    water: 'Weekly',
    size: 'Large',
    features: ['Air Purifying', 'Fast Growing', 'Low Maintenance'],
    rating: 4.4,
    reviews: 78
  },
  {
    id: 6,
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    category: 'Hanging Plants',
    price: 14.99,
    originalPrice: 19.99,
    description: 'Easy-to-grow hanging plant with long, arching leaves and plantlets.',
    image: 'https://images.unsplash.com/photo-1582108274664-7e8d7b6b2f61?w=400&h=400&fit=crop',
    inStock: 30,
    careLevel: 'Very Easy',
    sunlight: 'Bright, indirect light',
    water: 'Weekly',
    size: 'Small',
    features: ['Hanging', 'Air Purifying', 'Propagates Easily'],
    rating: 4.7,
    reviews: 156
  }
];

const plantService = {
  // Get all plants
  async getAllPlants(filters = {}) {
    try {
      const response = await api.get('/plants', { params: filters });
      return response.data;
    } catch (error) {
      // Return mock data for demo
      console.log('Using mock plant data for demo');
      return {
        plants: mockPlants,
        total: mockPlants.length,
        page: 1,
        totalPages: 1
      };
    }
  },

  // Get plant by ID
  async getPlantById(id) {
    try {
      const response = await api.get(`/plants/${id}`);
      return response.data;
    } catch (error) {
      // Return mock data for demo
      const plant = mockPlants.find(p => p.id === parseInt(id));
      if (plant) {
        return plant;
      }
      throw new Error('Plant not found');
    }
  },

  // Search plants
  async searchPlants(query) {
    try {
      const response = await api.get(`/plants/search?q=${query}`);
      return response.data;
    } catch (error) {
      // Return filtered mock data for demo
      const filteredPlants = mockPlants.filter(plant =>
        plant.name.toLowerCase().includes(query.toLowerCase()) ||
        plant.category.toLowerCase().includes(query.toLowerCase()) ||
        plant.description.toLowerCase().includes(query.toLowerCase())
      );
      return {
        plants: filteredPlants,
        total: filteredPlants.length
      };
    }
  },

  // Get plants by category
  async getPlantsByCategory(category) {
    try {
      const response = await api.get(`/plants/category/${category}`);
      return response.data;
    } catch (error) {
      // Return filtered mock data for demo
      const filteredPlants = mockPlants.filter(plant =>
        plant.category.toLowerCase() === category.toLowerCase()
      );
      return {
        plants: filteredPlants,
        total: filteredPlants.length
      };
    }
  },

  // Get featured plants
  async getFeaturedPlants() {
    try {
      const response = await api.get('/plants/featured');
      return response.data;
    } catch (error) {
      // Return mock featured plants for demo
      return {
        plants: mockPlants.slice(0, 3),
        total: 3
      };
    }
  },

  // Get plant categories
  async getCategories() {
    try {
      const response = await api.get('/plants/categories');
      return response.data;
    } catch (error) {
      // Return mock categories for demo
      const categories = [...new Set(mockPlants.map(plant => plant.category))];
      return { categories };
    }
  },

  // Add plant to wishlist
  async addToWishlist(plantId) {
    try {
      const response = await api.post('/wishlist', { plantId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add to wishlist');
    }
  },

  // Remove plant from wishlist
  async removeFromWishlist(plantId) {
    try {
      const response = await api.delete(`/wishlist/${plantId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove from wishlist');
    }
  },

  // Get user's wishlist
  async getWishlist() {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
};

export default plantService;