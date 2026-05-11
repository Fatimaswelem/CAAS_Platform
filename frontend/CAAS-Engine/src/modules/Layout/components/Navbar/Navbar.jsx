import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

export default function NavBar() {
  const navigate = useNavigate();
  const {userData , setUserData} = useContext(AuthContext);
  const isAuthenticated = userData != null?  true : false;

  const handleLogout = () => {
    localStorage.removeItem('token')
   setUserData(null)
   navigate('/login')
  };

  return (
    <Navbar expand="lg" className="navbar-custom sticky-top" variant="dark">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-cyan">
          <Code2 size={24} color="#00d2ff" />
          <span className="fw-bold tracking-tight">CaaS Engine</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            
            {isAuthenticated ? (
              <>
                <div className="d-flex align-items-center gap-2 me-3">
                  <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                    {userData?.sub?.[0] || ''}
                  </div>
                  <span className="fs-sm text-secondary">{userData?.sub}</span>
                </div>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="d-flex align-items-center gap-1">
                  <LogOut size={14} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Button as={Link} to="/register" className="btn-primary-custom btn-sm">Get Started</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
