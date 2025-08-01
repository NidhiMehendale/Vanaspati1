import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = await authService.login(formData);
      onLogin(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ backgroundColor: '#f8fffe', minHeight: '100vh', paddingTop: '50px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
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
                  <h2 className="fw-bold" style={{ color: '#2d5a27' }}>Welcome Back</h2>
                  <p className="text-muted">Sign in to your nursery account</p>
                </div>

                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
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

                  <Form.Group className="mb-4">
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
                        placeholder="Enter your password"
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
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </div>

                  <div className="text-center">
                    <Link 
                      to="/forgot-password" 
                      className="text-decoration-none"
                      style={{ color: '#2d5a27' }}
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link 
                      to="/signup" 
                      className="fw-semibold text-decoration-none"
                      style={{ color: '#2d5a27' }}
                    >
                      Sign up here
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

export default Login;