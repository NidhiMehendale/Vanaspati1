import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Dropdown, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faShoppingCart, 
  faUser, 
  faTachometerAlt, 
  faSignOutAlt, 
  faSeedling,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout, cartItemsCount }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setExpanded(false);
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      expanded={expanded}
      style={{ 
        backgroundColor: '#2d5a27', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        minHeight: '70px'
      }}
      variant="dark"
      fixed="top"
    >
      <Container>
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold d-flex align-items-center"
          style={{ fontSize: '1.5rem', color: '#ffffff' }}
          onClick={handleNavClick}
        >
          <FontAwesomeIcon icon={faLeaf} className="me-2" />
          GreenNursery
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          style={{ border: 'none', color: '#ffffff' }}
        >
          <FontAwesomeIcon icon={faBars} />
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className="fw-medium px-3"
              style={{ color: '#ffffff' }}
              onClick={handleNavClick}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/plants" 
              className="fw-medium px-3 d-flex align-items-center"
              style={{ color: '#ffffff' }}
              onClick={handleNavClick}
            >
              <FontAwesomeIcon icon={faSeedling} className="me-1" />
              Plants
            </Nav.Link>
            {user && (
              <Nav.Link 
                as={Link} 
                to="/dashboard" 
                className="fw-medium px-3 d-flex align-items-center"
                style={{ color: '#ffffff' }}
                onClick={handleNavClick}
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="me-1" />
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center">
            {/* Shopping Cart */}
            <Nav.Link 
              as={Link} 
              to="/cart" 
              className="position-relative me-3"
              style={{ color: '#ffffff' }}
              onClick={handleNavClick}
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {cartItemsCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute"
                  style={{ 
                    top: '-8px', 
                    right: '-8px',
                    fontSize: '0.7rem',
                    minWidth: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Nav.Link>

            {/* User Authentication */}
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="user-dropdown"
                  className="d-flex align-items-center border-0"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '25px',
                    padding: '8px 15px'
                  }}
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  <span className="d-none d-md-inline">
                    {user.firstName || user.name || 'User'}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{ 
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    borderRadius: '10px',
                    marginTop: '10px'
                  }}
                >
                  <Dropdown.Header className="text-muted">
                    <small>Welcome back!</small>
                    <div className="fw-bold" style={{ color: '#2d5a27' }}>
                      {user.firstName} {user.lastName}
                    </div>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  
                  <Dropdown.Item 
                    as={Link} 
                    to="/profile"
                    className="d-flex align-items-center py-2"
                    onClick={handleNavClick}
                  >
                    <FontAwesomeIcon icon={faUser} className="me-2" style={{ color: '#2d5a27' }} />
                    My Profile
                  </Dropdown.Item>
                  
                  <Dropdown.Item 
                    as={Link} 
                    to="/dashboard"
                    className="d-flex align-items-center py-2"
                    onClick={handleNavClick}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" style={{ color: '#2d5a27' }} />
                    Dashboard
                  </Dropdown.Item>
                  
                  <Dropdown.Divider />
                  
                  <Dropdown.Item 
                    onClick={handleLogout}
                    className="d-flex align-items-center py-2 text-danger"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                  size="sm"
                  className="fw-medium"
                  style={{ 
                    borderRadius: '20px',
                    padding: '6px 18px',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                  onClick={handleNavClick}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/signup"
                  variant="light"
                  size="sm"
                  className="fw-medium"
                  style={{ 
                    borderRadius: '20px',
                    padding: '6px 18px',
                    backgroundColor: '#ffffff',
                    color: '#2d5a27',
                    border: 'none'
                  }}
                  onClick={handleNavClick}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;