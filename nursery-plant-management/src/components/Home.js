import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faShoppingCart, 
  faStar, 
  faHeart,
  faShieldAlt,
  faTruck,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import plantService from '../services/plantService';

const Home = () => {
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedPlants();
  }, []);

  const loadFeaturedPlants = async () => {
    try {
      const response = await plantService.getFeaturedPlants();
      setFeaturedPlants(response.plants || []);
    } catch (error) {
      console.error('Error loading featured plants:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: faShieldAlt,
      title: 'Quality Assurance',
      description: 'Healthy plants guaranteed with expert care guidance'
    },
    {
      icon: faTruck,
      title: 'Fast Delivery',
      description: 'Safe and secure plant delivery to your doorstep'
    },
    {
      icon: faHeadset,
      title: '24/7 Support',
      description: 'Expert plant care support whenever you need'
    }
  ];

  return (
    <div style={{ marginTop: '70px' }}>
      {/* Hero Section */}
      <section 
        className="hero-section text-white d-flex align-items-center"
        style={{
          background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)',
          minHeight: '80vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop&opacity=0.3") center/cover',
            opacity: 0.2
          }}
        />
        <Container className="position-relative">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="display-3 fw-bold mb-4">
                  Bring Nature <br />
                  <span style={{ color: '#90EE90' }}>Into Your Home</span>
                </h1>
                <p className="fs-5 mb-4 opacity-90">
                  Discover our curated collection of beautiful, healthy plants 
                  that transform your space into a green paradise. From beginners 
                  to plant experts, we have something for everyone.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Button
                    as={Link}
                    to="/plants"
                    size="lg"
                    style={{
                      backgroundColor: '#90EE90',
                      border: 'none',
                      color: '#2d5a27',
                      fontWeight: '600',
                      padding: '12px 30px',
                      borderRadius: '25px'
                    }}
                  >
                    <FontAwesomeIcon icon={faLeaf} className="me-2" />
                    Shop Plants
                  </Button>
                  <Button
                    variant="outline-light"
                    size="lg"
                    style={{
                      fontWeight: '600',
                      padding: '12px 30px',
                      borderRadius: '25px',
                      borderWidth: '2px'
                    }}
                  >
                    Plant Care Guide
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-image">
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop"
                  alt="Beautiful Plants"
                  className="img-fluid rounded-circle shadow-lg"
                  style={{ maxWidth: '400px', border: '8px solid rgba(255,255,255,0.2)' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: '#f8fffe' }}>
        <Container>
          <Row>
            {features.map((feature, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="text-center h-100">
                  <div 
                    className="feature-icon mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#e8f5e8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={feature.icon} 
                      size="2x" 
                      style={{ color: '#2d5a27' }}
                    />
                  </div>
                  <h4 className="fw-bold mb-3" style={{ color: '#2d5a27' }}>
                    {feature.title}
                  </h4>
                  <p className="text-muted">
                    {feature.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Plants Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold" style={{ color: '#2d5a27' }}>
              Featured Plants
            </h2>
            <p className="text-muted fs-5">
              Handpicked favorites that are perfect for any space
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Row>
              {featuredPlants.map((plant) => (
                <Col lg={4} md={6} key={plant.id} className="mb-4">
                  <Card 
                    className="h-100 shadow-sm border-0 plant-card"
                    style={{ 
                      borderRadius: '15px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    <div className="position-relative">
                      <Card.Img
                        variant="top"
                        src={plant.image}
                        alt={plant.name}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                      <div className="position-absolute top-0 end-0 p-3">
                        <Button
                          variant="light"
                          size="sm"
                          className="rounded-circle p-2"
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
                      <p className="mb-3">{plant.description.substring(0, 80)}...</p>

                      <div className="d-flex justify-content-between align-items-center mb-3">
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
                        <Badge 
                          bg="light" 
                          text="dark"
                          style={{ fontSize: '0.7rem' }}
                        >
                          {plant.careLevel}
                        </Badge>
                      </div>

                      <div className="d-grid">
                        <Button
                          style={{
                            backgroundColor: '#2d5a27',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600'
                          }}
                        >
                          <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-5">
            <Button
              as={Link}
              to="/plants"
              variant="outline-success"
              size="lg"
              style={{
                borderWidth: '2px',
                fontWeight: '600',
                padding: '12px 40px',
                borderRadius: '25px'
              }}
            >
              View All Plants
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section 
        className="py-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h3 className="fw-bold mb-2">Stay Connected with Green Updates</h3>
              <p className="mb-0 opacity-90">
                Get plant care tips, new arrivals, and exclusive offers delivered to your inbox.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button
                variant="light"
                size="lg"
                style={{
                  color: '#2d5a27',
                  fontWeight: '600',
                  padding: '12px 30px',
                  borderRadius: '25px'
                }}
              >
                Subscribe Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .plant-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
        
        .hero-section {
          background-attachment: fixed;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            background-attachment: scroll;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;