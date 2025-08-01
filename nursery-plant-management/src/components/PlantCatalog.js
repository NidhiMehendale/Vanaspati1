import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  InputGroup, 
  Badge, 
  Dropdown,
  Alert
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faShoppingCart, 
  faHeart, 
  faStar,
  faLeaf,
  faGrid3X3Gap,
  faList
} from '@fortawesome/free-solid-svg-icons';
import plantService from '../services/plantService';

const PlantCatalog = ({ onAddToCart, user }) => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [careLevel, setCareLevel] = useState('All');
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    loadPlants();
    loadCategories();
  }, []);

  useEffect(() => {
    filterPlants();
  }, [plants, searchTerm, selectedCategory, sortBy, priceRange, careLevel]);

  const loadPlants = async () => {
    try {
      const response = await plantService.getAllPlants();
      setPlants(response.plants || []);
    } catch (error) {
      console.error('Error loading plants:', error);
      showAlert('Error loading plants', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await plantService.getCategories();
      setCategories(['All', ...(response.categories || [])]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const filterPlants = () => {
    let filtered = [...plants];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(plant => plant.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(plant => 
      plant.price >= priceRange[0] && plant.price <= priceRange[1]
    );

    // Care level filter
    if (careLevel !== 'All') {
      filtered = filtered.filter(plant => plant.careLevel === careLevel);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredPlants(filtered);
  };

  const handleAddToCart = (plant) => {
    onAddToCart(plant);
    showAlert(`${plant.name} added to cart!`, 'success');
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
  };

  const PlantCard = ({ plant, isListView = false }) => (
    <Card 
      className={`h-100 shadow-sm border-0 plant-card ${isListView ? 'mb-3' : ''}`}
      style={{ 
        borderRadius: '15px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <Row className={isListView ? 'g-0' : ''}>
        <Col md={isListView ? 4 : 12}>
          <div className="position-relative">
            <Card.Img
              variant="top"
              src={plant.image}
              alt={plant.name}
              style={{ 
                height: isListView ? '200px' : '250px', 
                objectFit: 'cover',
                width: '100%'
              }}
            />
            <div className="position-absolute top-0 end-0 p-3">
              <Button
                variant="light"
                size="sm"
                className="rounded-circle p-2 me-2"
                style={{ width: '40px', height: '40px' }}
              >
                <FontAwesomeIcon icon={faHeart} style={{ color: '#ff6b6b' }} />
              </Button>
            </div>
            {plant.originalPrice > plant.price && (
              <Badge 
                bg="danger" 
                className="position-absolute top-0 start-0 m-3"
                style={{ fontSize: '0.8rem' }}
              >
                Sale
              </Badge>
            )}
          </div>
        </Col>
        <Col md={isListView ? 8 : 12}>
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="fw-bold mb-0" style={{ color: '#2d5a27' }}>
                {plant.name}
              </h5>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} />
                <small className="ms-1 text-muted">
                  {plant.rating} ({plant.reviews})
                </small>
              </div>
            </div>

            <p className="text-muted small mb-2">{plant.scientificName}</p>
            <p className="mb-3">{plant.description.substring(0, isListView ? 150 : 80)}...</p>

            <div className="mb-3">
              <div className="d-flex flex-wrap gap-1">
                {plant.features.slice(0, 3).map((feature, index) => (
                  <Badge 
                    key={index}
                    bg="light" 
                    text="dark"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <Row className="align-items-center mb-3">
              <Col>
                <div>
                  <span className="fw-bold fs-5" style={{ color: '#2d5a27' }}>
                    ${plant.price}
                  </span>
                  {plant.originalPrice > plant.price && (
                    <span className="text-muted text-decoration-line-through ms-2">
                      ${plant.originalPrice}
                    </span>
                  )}
                </div>
              </Col>
              <Col xs="auto">
                <Badge 
                  bg="success" 
                  style={{ fontSize: '0.7rem' }}
                >
                  {plant.careLevel}
                </Badge>
              </Col>
            </Row>

            <div className="plant-info mb-3">
              <Row className="g-2">
                <Col sm={6}>
                  <small className="text-muted">
                    <FontAwesomeIcon icon={faLeaf} className="me-1" />
                    Size: {plant.size}
                  </small>
                </Col>
                <Col sm={6}>
                  <small className="text-muted">
                    Stock: {plant.inStock} available
                  </small>
                </Col>
              </Row>
            </div>

            <div className="d-grid">
              <Button
                onClick={() => handleAddToCart(plant)}
                disabled={plant.inStock === 0}
                style={{
                  backgroundColor: plant.inStock > 0 ? '#2d5a27' : '#ccc',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                {plant.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div style={{ marginTop: '70px', backgroundColor: '#f8fffe', minHeight: '100vh' }}>
      <Container className="py-4">
        {/* Alert */}
        {alert.show && (
          <Alert variant={alert.variant} className="mb-4">
            {alert.message}
          </Alert>
        )}

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#2d5a27' }}>
              Plant Catalog
            </h2>
            <p className="text-muted mb-0">
              Discover our collection of {filteredPlants.length} beautiful plants
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'success' : 'outline-success'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <FontAwesomeIcon icon={faGrid3X3Gap} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'success' : 'outline-success'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <FontAwesomeIcon icon={faList} />
            </Button>
          </div>
        </div>

        <Row>
          {/* Filters Sidebar */}
          <Col lg={3} className="mb-4">
            <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Header 
                className="border-0"
                style={{ backgroundColor: '#2d5a27', color: 'white', borderRadius: '15px 15px 0 0' }}
              >
                <h6 className="mb-0 fw-bold">
                  <FontAwesomeIcon icon={faFilter} className="me-2" />
                  Filters
                </h6>
              </Card.Header>
              <Card.Body>
                {/* Search */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Search</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search plants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                {/* Category */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Category</Form.Label>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Care Level */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Care Level</Form.Label>
                  <Form.Select
                    value={careLevel}
                    onChange={(e) => setCareLevel(e.target.value)}
                  >
                    <option value="All">All Levels</option>
                    <option value="Very Easy">Very Easy</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                  </Form.Select>
                </Form.Group>

                {/* Price Range */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Form.Label>
                  <Form.Range
                    min={0}
                    max={100}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                </Form.Group>

                {/* Sort By */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Sort By</Form.Label>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating: High to Low</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="outline-success"
                  size="sm"
                  className="w-100"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setCareLevel('All');
                    setPriceRange([0, 100]);
                    setSortBy('name');
                  }}
                >
                  Clear Filters
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Plants Grid/List */}
          <Col lg={9}>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading plants...</p>
              </div>
            ) : filteredPlants.length === 0 ? (
              <div className="text-center py-5">
                <FontAwesomeIcon 
                  icon={faLeaf} 
                  size="3x" 
                  style={{ color: '#ccc' }}
                  className="mb-3"
                />
                <h4 className="text-muted">No plants found</h4>
                <p className="text-muted">Try adjusting your filters or search terms</p>
              </div>
            ) : viewMode === 'grid' ? (
              <Row>
                {filteredPlants.map((plant) => (
                  <Col lg={4} md={6} key={plant.id} className="mb-4">
                    <PlantCard plant={plant} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div>
                {filteredPlants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} isListView={true} />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .plant-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12) !important;
        }
      `}</style>
    </div>
  );
};

export default PlantCatalog;