import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Alert,
  Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEdit, 
  faKey, 
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setEditMode(false);
      showAlert('Profile updated successfully!', 'success');
    }, 1000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showAlert('New passwords do not match', 'danger');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showAlert('Password must be at least 6 characters long', 'danger');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showAlert('Password changed successfully!', 'success');
    }, 1000);
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
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
              <FontAwesomeIcon icon={faUser} className="me-2" />
              My Profile
            </h2>
            <p className="text-muted mb-0">
              Manage your account information and preferences
            </p>
          </div>
          <Button
            variant={editMode ? "outline-danger" : "outline-success"}
            onClick={() => setEditMode(!editMode)}
          >
            <FontAwesomeIcon icon={editMode ? faTimes : faEdit} className="me-2" />
            {editMode ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <Row>
          {/* Profile Information */}
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Header 
                className="border-0"
                style={{ backgroundColor: '#2d5a27', color: 'white', borderRadius: '15px 15px 0 0' }}
              >
                <h5 className="mb-0 fw-bold">Personal Information</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          style={{ 
                            backgroundColor: editMode ? 'white' : '#f8f9fa',
                            border: editMode ? '1px solid #ddd' : 'none'
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Last Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          style={{ 
                            backgroundColor: editMode ? 'white' : '#f8f9fa',
                            border: editMode ? '1px solid #ddd' : 'none'
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      style={{ 
                        backgroundColor: editMode ? 'white' : '#f8f9fa',
                        border: editMode ? '1px solid #ddd' : 'none'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FontAwesomeIcon icon={faPhone} className="me-2" />
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="Enter your phone number"
                      style={{ 
                        backgroundColor: editMode ? 'white' : '#f8f9fa',
                        border: editMode ? '1px solid #ddd' : 'none'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                      Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="Enter your address"
                      style={{ 
                        backgroundColor: editMode ? 'white' : '#f8f9fa',
                        border: editMode ? '1px solid #ddd' : 'none'
                      }}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          placeholder="City"
                          style={{ 
                            backgroundColor: editMode ? 'white' : '#f8f9fa',
                            border: editMode ? '1px solid #ddd' : 'none'
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">State</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          placeholder="State"
                          style={{ 
                            backgroundColor: editMode ? 'white' : '#f8f9fa',
                            border: editMode ? '1px solid #ddd' : 'none'
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">ZIP Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          placeholder="ZIP"
                          style={{ 
                            backgroundColor: editMode ? 'white' : '#f8f9fa',
                            border: editMode ? '1px solid #ddd' : 'none'
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {editMode && (
                    <div className="d-flex gap-2">
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: '#2d5a27',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600'
                        }}
                      >
                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() => setEditMode(false)}
                      >
                        <FontAwesomeIcon icon={faTimes} className="me-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Account Settings */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
              <Card.Header 
                className="border-0"
                style={{ backgroundColor: '#2d5a27', color: 'white', borderRadius: '15px 15px 0 0' }}
              >
                <h5 className="mb-0 fw-bold">Account Settings</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="d-grid gap-3">
                  <Button
                    variant="outline-warning"
                    onClick={() => setShowPasswordModal(true)}
                    className="text-start"
                  >
                    <FontAwesomeIcon icon={faKey} className="me-2" />
                    Change Password
                  </Button>
                  
                  <Button variant="outline-info" className="text-start">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Email Preferences
                  </Button>
                  
                  <Button variant="outline-secondary" className="text-start">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Privacy Settings
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Account Summary */}
            <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Header style={{ backgroundColor: '#f8fffe', border: 'none' }}>
                <h6 className="mb-0 fw-bold">Account Summary</h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <small className="text-muted">Member since</small>
                  <div className="fw-semibold">January 2024</div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Account Type</small>
                  <div className="fw-semibold">Premium Member</div>
                </div>
                <div className="mb-0">
                  <small className="text-muted">Status</small>
                  <div>
                    <span className="badge bg-success">Active</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Change Password Modal */}
        <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#2d5a27', color: 'white' }}>
            <Modal.Title>
              <FontAwesomeIcon icon={faKey} className="me-2" />
              Change Password
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handlePasswordSubmit}>
            <Modal.Body className="p-4">
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                />
                <Form.Text className="text-muted">
                  Password must be at least 6 characters long
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: '#2d5a27',
                  border: 'none',
                  fontWeight: '600'
                }}
              >
                Change Password
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default Profile;