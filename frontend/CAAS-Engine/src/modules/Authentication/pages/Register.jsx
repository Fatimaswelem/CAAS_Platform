import { useContext, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { ShieldAlert } from 'lucide-react';
import { AuthAPI } from '../../../api';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const {saveUserData} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    setLoading(true);
        try {
          const response = await AuthAPI.Register(data);
          const token = response?.data?.token;
          localStorage.setItem('token' , token);
          saveUserData();
          setLoading(false);
          toast.success("Your Account is Registered!");
          navigate("/")
        } catch (error) {
            toast.error(error?.response?.data?.error || "Registeration in Failed")
        } finally{
          setLoading(false)
        }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5" style={{ background: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070") no-repeat center center/cover' }}>
      <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(15, 17, 26, 0.9)' }}></div>
      <Container className="position-relative z-index-1">
        <Row className="justify-content-center">
          <Col md={7} lg={5}>
            <Card className="glass-card shadow-lg p-3">
              <div className="text-center mb-4">
                <div className="d-inline-flex p-3 rounded-3 bg-secondary-custom mb-3" style={{ background: '#1a1d2b', border: '1px solid #30363d' }}>
                  <ShieldAlert size={32} color="#9d50bb" />
                </div>
                <p className="text-secondary fs-xs text-uppercase tracking-widest mb-1">CaaS Engine</p>
                <h2 className="fw-bold tracking-tight">Create your account</h2>
                <p className="text-secondary fs-sm max-w-sm mx-auto">Start compiling and scaling your cloud architecture with precision engineering.</p>
              </div>

              <RegisterForm onSubmit={handleRegister} loading={loading} />

              <hr className="border-secondary my-4" />

              <div className="text-center">
                <p className="text-secondary fs-sm mb-0">
                  Already part of the network? <Link to="/login" className="text-white text-decoration-none fw-bold hover-cyan">Log In</Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};