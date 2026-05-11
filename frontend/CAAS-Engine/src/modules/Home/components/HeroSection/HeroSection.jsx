import { ChevronRight } from 'lucide-react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HeroSection(){
  return (
    <Container fluid className="px-0">
      <div className="hero-gradient text-center">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h1 className="display-3 fw-bold tracking-tight text-white mb-4">
              Master the Art of <span className="text-secondary text-gradient-purple">Compilation</span>
            </h1>
            <p className="lead text-secondary mb-5 px-lg-5">
              Experience the high-performance pipeline of modern compiler design. 
              From tokenization to logical reconstruction, analyze code with precision.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button as={Link} to="/workspace" className="btn-primary-custom d-flex align-items-center gap-2 px-5 py-3">
                <span>Start Analyzing</span>
                <ChevronRight size={20} />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};