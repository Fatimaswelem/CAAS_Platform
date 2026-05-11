import  { useContext, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';

import { Cpu } from 'lucide-react';
import { AuthAPI } from '../../../api';
import { AuthContext } from './../../../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const {saveUserData} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await AuthAPI.Login(data);
      const token = response?.data?.token;
      localStorage.setItem('token' , token);
      saveUserData();
      setLoading(false);
      toast.success("Logged in!");
      navigate("/")
    } catch (error) {
        toast.error(error?.response?.data?.error || "logged in Failed")
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5" style={{ background: 'radial-gradient(circle at center, #1a1d2b 0%, #0f111a 100%)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5} lg={4}>
            <Card className="glass-card shadow-lg p-3">
              <div className="text-center mb-4">
                <div className="d-inline-flex p-3 rounded-3 bg-primary-custom mb-3" style={{ background: 'linear-gradient(45deg, #9d50bb, #6e48aa)' }}>
                  <Cpu size={32} color="#fff" />
                </div>
                <h2 className="fw-bold tracking-tight mb-1">CaaS Engine</h2>
                <p className="text-secondary fs-xs text-uppercase tracking-widest">Compiler as a Service</p>
              </div>

              <LoginForm onSubmit={handleLogin} loading={loading} />

              <div className="text-center mt-3">
                <p className="text-secondary fs-sm mb-0">
                  New to the engine? <Link to="/register" className="text-white text-decoration-none fw-bold hover-cyan">Create New account</Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};