import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PlantCatalog from './components/PlantCatalog';
import Cart from './components/Cart';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('nurseryUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load cart items from localStorage
    const savedCart = localStorage.getItem('nurseryCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('nurseryUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nurseryUser');
    localStorage.removeItem('nurseryCart');
    setCartItems([]);
  };

  const addToCart = (plant) => {
    const existingItem = cartItems.find(item => item.id === plant.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...plant, quantity: 1 }];
    }
    
    setCartItems(updatedCart);
    localStorage.setItem('nurseryCart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (plantId) => {
    const updatedCart = cartItems.filter(item => item.id !== plantId);
    setCartItems(updatedCart);
    localStorage.setItem('nurseryCart', JSON.stringify(updatedCart));
  };

  const updateCartQuantity = (plantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === plantId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('nurseryCart', JSON.stringify(updatedCart));
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard" /> : <Signup />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/plants" 
            element={<PlantCatalog onAddToCart={addToCart} user={user} />} 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cartItems={cartItems}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
                user={user}
              />
            } 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
