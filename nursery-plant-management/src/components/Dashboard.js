import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  Tab, 
  Tabs,
  Table,
  ProgressBar
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faShoppingBag, 
  faLeaf, 
  faCalendarAlt,
  faEye,
  faDownload,
  faTruck,
  faCheckCircle,
  faHeart,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    plantsOwned: 0,
    favoriteCategory: 'Indoor Plants'
  });

  useEffect(() => {
    // Mock data for demo
    const mockOrders = [
      {
        id: 'ORD-001',
        date: '2024-01-15',
        status: 'Delivered',
        total: 79.98,
        items: [
          { name: 'Monstera Deliciosa', price: 29.99, quantity: 1 },
          { name: 'Snake Plant', price: 19.99, quantity: 1 },
          { name: 'Peace Lily', price: 24.99, quantity: 1 }
        ]
      },
      {
        id: 'ORD-002',
        date: '2024-01-20',
        status: 'In Transit',
        total: 49.99,
        items: [
          { name: 'Fiddle Leaf Fig', price: 49.99, quantity: 1 }
        ]
      },
      {
        id: 'ORD-003',
        date: '2024-01-25',
        status: 'Processing',
        total: 34.99,
        items: [
          { name: 'Rubber Plant', price: 34.99, quantity: 1 }
        ]
      }
    ];

    setOrders(mockOrders);
    setStats({
      totalOrders: mockOrders.length,
      totalSpent: mockOrders.reduce((total, order) => total + order.total, 0),
      plantsOwned: mockOrders.reduce((total, order) => 
        total + order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0), 0),
      favoriteCategory: 'Indoor Plants'
    });
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge bg="success"><FontAwesomeIcon icon={faCheckCircle} className="me-1" />Delivered</Badge>;
      case 'In Transit':
        return <Badge bg="primary"><FontAwesomeIcon icon={faTruck} className="me-1" />In Transit</Badge>;
      case 'Processing':
        return <Badge bg="warning"><FontAwesomeIcon icon={faChartLine} className="me-1" />Processing</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const StatsCard = ({ icon, title, value, subtitle, color = '#2d5a27' }) => (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
      <Card.Body className="p-4">
        <div className="d-flex align-items-center">
          <div 
            className="me-3"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: `${color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FontAwesomeIcon icon={icon} size="lg" style={{ color }} />
          </div>
          <div>
            <h3 className="fw-bold mb-0" style={{ color }}>{value}</h3>
            <h6 className="fw-semibold mb-0" style={{ color: '#666' }}>{title}</h6>
            {subtitle && <small className="text-muted">{subtitle}</small>}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div style={{ marginTop: '70px', backgroundColor: '#f8fffe', minHeight: '100vh' }}>
      <Container className="py-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1" style={{ color: '#2d5a27' }}>
            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
            Dashboard
          </h2>
          <p className="text-muted mb-0">
            Welcome back, {user?.firstName}! Here's your plant journey overview.
          </p>
        </div>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <StatsCard
              icon={faShoppingBag}
              title="Total Orders"
              value={stats.totalOrders}
              subtitle="All time"
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatsCard
              icon={faLeaf}
              title="Plants Owned"
              value={stats.plantsOwned}
              subtitle="Growing collection"
              color="#4a7c59"
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatsCard
              icon={faChartLine}
              title="Total Spent"
              value={`$${stats.totalSpent.toFixed(2)}`}
              subtitle="Lifetime investment"
              color="#6a8a6a"
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatsCard
              icon={faHeart}
              title="Favorite Category"
              value={stats.favoriteCategory}
              subtitle="Most purchased"
              color="#8fbc8f"
            />
          </Col>
        </Row>

        {/* Tabs Content */}
        <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
          <Card.Header className="border-0" style={{ backgroundColor: 'white', borderRadius: '15px 15px 0 0' }}>
            <Tabs
              activeKey={activeTab}
              onSelect={(tab) => setActiveTab(tab)}
              className="border-bottom-0"
              fill
            >
              <Tab eventKey="overview" title="Overview" />
              <Tab eventKey="orders" title="Order History" />
              <Tab eventKey="plants" title="My Plants" />
              <Tab eventKey="profile" title="Profile Settings" />
            </Tabs>
          </Card.Header>
          <Card.Body className="p-4">
            {activeTab === 'overview' && (
              <div>
                <Row>
                  <Col lg={8} className="mb-4">
                    <h5 className="fw-bold mb-3" style={{ color: '#2d5a27' }}>Recent Activity</h5>
                    <div className="recent-activity">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                          <div className="me-3">
                            <FontAwesomeIcon icon={faShoppingBag} style={{ color: '#2d5a27' }} />
                          </div>
                          <div className="flex-grow-1">
                            <div className="fw-semibold">Order {order.id}</div>
                            <small className="text-muted">
                              {new Date(order.date).toLocaleDateString()} • ${order.total}
                            </small>
                          </div>
                          <div>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col lg={4}>
                    <h5 className="fw-bold mb-3" style={{ color: '#2d5a27' }}>Plant Care Progress</h5>
                    <div className="care-progress">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Watering Schedule</small>
                          <small>75%</small>
                        </div>
                        <ProgressBar variant="success" now={75} />
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Fertilizing</small>
                          <small>60%</small>
                        </div>
                        <ProgressBar variant="info" now={60} />
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Repotting</small>
                          <small>30%</small>
                        </div>
                        <ProgressBar variant="warning" now={30} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: '#2d5a27' }}>Order History</h5>
                  <Button variant="outline-success" size="sm">
                    <FontAwesomeIcon icon={faDownload} className="me-1" />
                    Export
                  </Button>
                </div>
                
                <div className="table-responsive">
                  <Table hover>
                    <thead style={{ backgroundColor: '#f8fffe' }}>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="fw-semibold">{order.id}</td>
                          <td>{new Date(order.date).toLocaleDateString()}</td>
                          <td>{order.items.length} item(s)</td>
                          <td className="fw-bold">${order.total}</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                              <FontAwesomeIcon icon={faDownload} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}

            {activeTab === 'plants' && (
              <div>
                <h5 className="fw-bold mb-4" style={{ color: '#2d5a27' }}>My Plant Collection</h5>
                <Row>
                  {orders.flatMap(order => order.items).map((plant, index) => (
                    <Col lg={4} md={6} key={index} className="mb-4">
                      <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                        <Card.Body className="p-3">
                          <div className="d-flex align-items-center">
                            <div 
                              className="me-3"
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#e8f5e8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <FontAwesomeIcon icon={faLeaf} style={{ color: '#2d5a27' }} />
                            </div>
                            <div>
                              <h6 className="fw-bold mb-0">{plant.name}</h6>
                              <small className="text-muted">Purchased recently</small>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h5 className="fw-bold mb-4" style={{ color: '#2d5a27' }}>Profile Settings</h5>
                <Row>
                  <Col lg={6}>
                    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
                      <Card.Header style={{ backgroundColor: '#f8fffe', border: 'none' }}>
                        <h6 className="mb-0 fw-bold">Personal Information</h6>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-3">
                          <strong>Name:</strong> {user?.firstName} {user?.lastName}
                        </div>
                        <div className="mb-3">
                          <strong>Email:</strong> {user?.email}
                        </div>
                        <div className="mb-3">
                          <strong>Phone:</strong> {user?.phone || 'Not provided'}
                        </div>
                        <Button variant="outline-success">Edit Profile</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6}>
                    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
                      <Card.Header style={{ backgroundColor: '#f8fffe', border: 'none' }}>
                        <h6 className="mb-0 fw-bold">Account Security</h6>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-3">
                          <strong>Password:</strong> ••••••••
                        </div>
                        <div className="mb-3">
                          <strong>Two-Factor Auth:</strong> Disabled
                        </div>
                        <Button variant="outline-warning" className="me-2">Change Password</Button>
                        <Button variant="outline-info">Enable 2FA</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;