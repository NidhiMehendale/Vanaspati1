# 🌱 Nursery Plant Management System

A comprehensive, modern web application for managing plant inventory and providing an exceptional plant shopping experience. Built with ReactJS and Bootstrap, this system streamlines plant care and inventory tracking with a clean, user-friendly interface inspired by leading nursery websites.

## ✨ Features

### 🔐 Authentication System
- **User Registration**: Clean signup process with validation
- **Secure Login**: Email/password authentication with mock JWT tokens
- **Password Management**: Change password functionality with security validation
- **Protected Routes**: Automatic redirection for authenticated/unauthenticated users

### 🛒 Shopping Experience
- **Plant Catalog**: Comprehensive plant inventory with detailed information
- **Advanced Filtering**: Filter by category, price range, care level, and more
- **Search Functionality**: Real-time search across plant names, categories, and descriptions
- **Shopping Cart**: Full cart management with quantity controls and checkout
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📊 User Dashboard
- **Purchase History**: Complete order tracking with status updates
- **Account Statistics**: Total orders, plants owned, spending analytics
- **Plant Collection**: View and manage purchased plants
- **Profile Management**: Edit personal information and account settings

### 🎨 Design & UX
- **Modern UI**: Clean, green-themed design inspired by Ugaoo.com
- **Bootstrap Integration**: Responsive components and professional styling
- **FontAwesome Icons**: Consistent iconography throughout the application
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Accessibility**: ARIA labels, focus management, and keyboard navigation

## 🚀 Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Bootstrap**: Responsive UI components
- **React Router Dom**: Client-side routing and navigation
- **FontAwesome**: Professional icon library
- **Axios**: HTTP client for API communication

### Backend Ready
- **Spring Boot**: Configured for RESTful API integration
- **Mock Data**: Demo functionality with realistic plant inventory
- **JWT Authentication**: Token-based security (mock implementation)
- **Local Storage**: Client-side data persistence

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nursery-plant-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
nursery-plant-management/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/           # React components
│   │   ├── Cart.js          # Shopping cart functionality
│   │   ├── Dashboard.js     # User dashboard
│   │   ├── Home.js          # Landing page
│   │   ├── Login.js         # Authentication
│   │   ├── Navbar.js        # Navigation component
│   │   ├── PlantCatalog.js  # Plant inventory display
│   │   ├── Profile.js       # User profile management
│   │   └── Signup.js        # User registration
│   ├── services/            # API services
│   │   ├── authService.js   # Authentication API calls
│   │   └── plantService.js  # Plant data management
│   ├── utils/               # Utility functions
│   ├── App.js               # Main application component
│   ├── App.css              # Custom styles and animations
│   └── index.js             # Application entry point
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for custom configuration:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_APP_NAME=GreenNursery
```

### Spring Boot Backend Integration
The application is configured to work with a Spring Boot backend. Update the API base URL in the services files to connect to your backend server.

## 🎯 Usage

### For Customers
1. **Browse Plants**: Visit the catalog to explore available plants
2. **Filter & Search**: Use filters to find plants that match your needs
3. **Add to Cart**: Select plants and manage quantities
4. **Checkout**: Complete purchase with shipping and payment details
5. **Track Orders**: Monitor order status in your dashboard

### For Administrators
The system is designed to be extended with admin features:
- Plant inventory management
- Order processing
- User management
- Analytics and reporting

## 🎨 Design System

### Color Palette
- **Primary Green**: `#2d5a27` - Main brand color
- **Secondary Green**: `#4a7c59` - Accent color
- **Light Green**: `#8fbc8f` - Highlights
- **Background**: `#f8fffe` - Light green background

### Typography
- **Headings**: Bold, green-colored for emphasis
- **Body Text**: Clean, readable sans-serif
- **Accents**: FontAwesome icons for visual consistency

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Hover effects with smooth transitions
- **Forms**: Clean inputs with green focus states
- **Navigation**: Fixed navbar with user context

## 📱 Responsive Design

The application is fully responsive across all device sizes:

- **Desktop** (1200px+): Full feature layout with sidebar filters
- **Tablet** (768px - 1199px): Adapted layout with collapsible elements
- **Mobile** (< 768px): Stack layout with mobile-optimized navigation

## 🔒 Security Features

- **Input Validation**: Client-side form validation
- **Password Requirements**: Minimum length and complexity
- **Route Protection**: Authentication-based access control
- **Token Management**: Secure JWT token handling
- **XSS Prevention**: Sanitized user inputs

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Direct GitHub integration
- **Vercel**: Optimized for React applications
- **AWS S3**: Static website hosting
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Ugaoo.com for clean, modern nursery UI/UX
- **Icons**: FontAwesome for professional iconography
- **Images**: Unsplash for high-quality plant photography
- **Framework**: React and Bootstrap communities

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

Built with ❤️ and 🌱 for plant enthusiasts everywhere!
