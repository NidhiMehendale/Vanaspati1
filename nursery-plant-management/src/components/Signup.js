import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faEye, faEyeSlash, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await authService.signup(formData);
      setSuccess('Account created successfully! Please sign in.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page" style={{ backgroundColor: '#f8fffe', minHeight: '100vh', paddingTop: '30px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <FontAwesomeIcon 
                      icon={faLeaf} 
                      size="3x" 
                      style={{ color: '#2d5a27' }}
                    />
                  </div>
                  <h2 className="fw-bold" style={{ color: '#2d5a27' }}>Join Our Nursery</h2>
                  <p className="text-muted">Create your account to start your plant journey</p>
                </div>

                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
                {success && <Alert variant="success" className="mb-4">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold" style={{ color: '#2d5a27' }}>
                          First Name
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text style={{ backgroundColor: '#f8fffe', border: '1px solid #ddd' }}>
                            <FontAwesomeIcon icon={faUser} style={{ color: '#2d5a27' }} />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            style={{ border: '1px solid #ddd', borderLeft: 'none' }}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold" style={{ color: '#2d5a27' }}>
                          Last Name
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text style={{ backgroundColor: '#f8fffe', border: '1px solid #ddd' }}>
                            <FontAwesomeIcon icon={faUser} style={{ color: '#2d5a27' }} />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            style={{ border: '1px solid #ddd', borderLeft: 'none' }}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold" style={{ color: '#2d5a27' }}>
                      Email Address
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ backgroundColor: '#f8fffe', border: '1px solid #ddd' }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#2d5a27' }} />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ border: '1px solid #ddd', borderLeft: 'none' }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold" style={{ color: '#2d5a27' }}>
                      Phone Number
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ backgroundColor: '#f8fffe', border: '1px solid #ddd' }}>
                        <FontAwesomeIcon icon={faPhone} style={{ color: '#2d5a27' }} />
                      </InputGroup.Text>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{ border: '1px solid #ddd', borderLeft: 'none' }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold" style={{ color: '#2d5a27' }}>
                          Password
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text style={{ backgroundColor: '#f8fffe', border: '1px solid #ddd' }}>
                            <FontAwesomeIcon icon={faLock} style={{ color: '#2d5a27' }} />
                          </InputGroup.Text>
                          <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none' }}
                          />
                          <InputGroup.Text 
                            style={{ 
                              backgroundColor: '#f8fffe', 
                              border: '1px solid #ddd',
                              cursor: 'pointer'
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <FontAwesomeIcon 
                              icon={showPassword ? faEyeSlash : faEye} 
                              style={{ color: '#2d5a27' }} 
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold" style={{ color: '#2d5a27' }}>
                          Confirm Password
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text style={{ backgroundColor: '#f8fffe', border: '1px solid #ddd' }}>
                            <FontAwesomeIcon icon={faLock} style={{ color: '#2d5a27' }} />
                          </InputGroup.Text>
                          <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={{ border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none' }}
                          />
                          <InputGroup.Text 
                            style={{ 
                              backgroundColor: '#f8fffe', 
                              border: '1px solid #ddd',
                              cursor: 'pointer'
                            }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <FontAwesomeIcon 
                              icon={showConfirmPassword ? faEyeSlash : faEye} 
                              style={{ color: '#2d5a27' }} 
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      style={{
                        backgroundColor: '#2d5a27',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>

                  <div className="text-center">
                    <small className="text-muted">
                      By signing up, you agree to our Terms of Service and Privacy Policy
                    </small>
                  </div>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="fw-semibold text-decoration-none"
                      style={{ color: '#2d5a27' }}
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;