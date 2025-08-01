import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  InputGroup, 
  Badge,
  Alert,
  Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faTrash, 
  faMinus, 
  faPlus,
  faCredit-card,
  faArrowLeft,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, user }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (plantId, newQuantity) => {
    if (newQuantity < 1) {
      onRemoveFromCart(plantId);
    } else {
      onUpdateQuantity(plantId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      showAlert('Please login to proceed with checkout', 'warning');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setCheckoutLoading(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setCheckoutLoading(false);
      setShowCheckoutModal(false);
      showAlert('Order placed successfully! Check your dashboard for details.', 'success');
      
      // Clear cart after successful order
      cartItems.forEach(item => onRemoveFromCart(item.id));
      
      setTimeout(() => navigate('/dashboard'), 2000);
    }, 2000);
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 5000);
  };

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
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              Shopping Cart
            </h2>
            <p className="text-muted mb-0">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            as={Link}
            to="/plants"
            variant="outline-success"
            className="d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Continue Shopping
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <FontAwesomeIcon 
              icon={faShoppingCart} 
              size="4x" 
              style={{ color: '#ccc' }}
              className="mb-4"
            />
            <h3 className="text-muted mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">
              Looks like you haven't added any plants to your cart yet.
            </p>
            <Button
              as={Link}
              to="/plants"
              size="lg"
              style={{
                backgroundColor: '#2d5a27',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 30px',
                fontWeight: '600'
              }}
            >
              <FontAwesomeIcon icon={faLeaf} className="me-2" />
              Start Shopping
            </Button>
          </div>
        ) : (
          <Row>
            {/* Cart Items */}
            <Col lg={8} className="mb-4">
              <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Header 
                  className="border-0"
                  style={{ backgroundColor: '#2d5a27', color: 'white', borderRadius: '15px 15px 0 0' }}
                >
                  <h5 className="mb-0 fw-bold">Cart Items</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="p-4">
                        <Row className="align-items-center">
                          <Col md={2}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded"
                              style={{ 
                                width: '80px', 
                                height: '80px', 
                                objectFit: 'cover'
                              }}
                            />
                          </Col>
                          <Col md={4}>
                            <h6 className="fw-bold mb-1" style={{ color: '#2d5a27' }}>
                              {item.name}
                            </h6>
                            <p className="text-muted small mb-1">{item.scientificName}</p>
                            <Badge bg="light" text="dark" style={{ fontSize: '0.7rem' }}>
                              {item.careLevel}
                            </Badge>
                          </Col>
                          <Col md={2}>
                            <div className="fw-bold" style={{ color: '#2d5a27' }}>
                              ${item.price}
                            </div>
                          </Col>
                          <Col md={3}>
                            <InputGroup size="sm" style={{ maxWidth: '120px' }}>
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                style={{ borderColor: '#ddd' }}
                              >
                                <FontAwesomeIcon icon={faMinus} size="xs" />
                              </Button>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                className="text-center"
                                min="1"
                                style={{ borderColor: '#ddd' }}
                              />
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                style={{ borderColor: '#ddd' }}
                              >
                                <FontAwesomeIcon icon={faPlus} size="xs" />
                              </Button>
                            </InputGroup>
                          </Col>
                          <Col md={1} className="text-end">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => onRemoveFromCart(item.id)}
                              className="rounded-circle"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                      {index < cartItems.length - 1 && <hr className="my-0" />}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Order Summary */}
            <Col lg={4}>
              <Card className="border-0 shadow-sm sticky-top" style={{ borderRadius: '15px', top: '90px' }}>
                <Card.Header 
                  className="border-0"
                  style={{ backgroundColor: '#2d5a27', color: 'white', borderRadius: '15px 15px 0 0' }}
                >
                  <h5 className="mb-0 fw-bold">Order Summary</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>
                      {shipping === 0 ? (
                        <Badge bg="success">FREE</Badge>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <strong style={{ color: '#2d5a27' }}>Total:</strong>
                    <strong style={{ color: '#2d5a27' }}>${total.toFixed(2)}</strong>
                  </div>

                  {shipping > 0 && (
                    <Alert variant="info" className="small mb-3">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </Alert>
                  )}

                  <div className="d-grid gap-2">
                    <Button
                      size="lg"
                      onClick={() => setShowCheckoutModal(true)}
                      style={{
                        backgroundColor: '#2d5a27',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        padding: '12px'
                      }}
                    >
                      <FontAwesomeIcon icon={faCredit-card} className="me-2" />
                      Proceed to Checkout
                    </Button>
                    <Button
                      as={Link}
                      to="/plants"
                      variant="outline-success"
                      size="lg"
                      style={{
                        borderRadius: '8px',
                        fontWeight: '600',
                        padding: '12px'
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </div>

                  <div className="text-center mt-4">
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faLeaf} className="me-1" />
                      Secure checkout protected by SSL
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Checkout Modal */}
        <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#2d5a27', color: 'white' }}>
            <Modal.Title>
              <FontAwesomeIcon icon={faCredit-card} className="me-2" />
              Checkout
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="text-center mb-4">
              <h5 style={{ color: '#2d5a27' }}>Order Total: ${total.toFixed(2)}</h5>
            </div>
            
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" defaultValue={user?.firstName || ''} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" defaultValue={user?.lastName || ''} />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={user?.email || ''} />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control type="text" placeholder="123 Main Street" />
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>ZIP</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="1234 5678 9012 3456" />
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control type="text" placeholder="MM/YY" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" placeholder="123" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowCheckoutModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              style={{
                backgroundColor: '#2d5a27',
                border: 'none',
                fontWeight: '600'
              }}
            >
              {checkoutLoading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Cart;