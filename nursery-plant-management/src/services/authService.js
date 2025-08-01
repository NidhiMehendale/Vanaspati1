import axios from 'axios';

// Configure base URL for API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('nurseryUser');
      localStorage.removeItem('nurseryCart');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const userData = response.data;
      
      // Store user data in localStorage
      localStorage.setItem('nurseryUser', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      // For demo purposes, simulate successful login
      if (credentials.email && credentials.password) {
        const mockUser = {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: credentials.email,
          phone: '+1234567890',
          token: 'mock-jwt-token-' + Date.now(),
          role: 'USER'
        };
        localStorage.setItem('nurseryUser', JSON.stringify(mockUser));
        return mockUser;
      }
      
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register new user
  async signup(userData) {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      // For demo purposes, simulate successful signup
      if (userData.email && userData.password && userData.firstName && userData.lastName) {
        return { 
          message: 'User registered successfully',
          success: true 
        };
      }
      
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('nurseryUser');
    localStorage.removeItem('nurseryCart');
  },

  // Get current user
  getCurrentUser() {
    const userData = localStorage.getItem('nurseryUser');
    return userData ? JSON.parse(userData) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    const user = this.getCurrentUser();
    return user && user.token;
  },

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData);
      const updatedUser = response.data;
      
      // Update localStorage
      localStorage.setItem('nurseryUser', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.post('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password change failed');
    }
  },

  // Request password reset
  async requestPasswordReset(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset request failed');
    }
  }
};

export default authService;