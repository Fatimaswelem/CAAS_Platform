import { Layers, Menu } from 'lucide-react';
import { Card, Col, Row } from 'react-bootstrap';

export default function FeaturesSection(){
  const features = [
    {
      icon: <Menu size={24} className="text-cyan" />,
      title: 'Lexical Analysis',
      description: 'The lexer transforms a stream of characters into a sequence of meaningful tokens. It identifies keywords, identifiers, and literals.'
    },
    {
      icon: <Layers size={24} className="text-purple" />,
      title: 'Syntax Parsing',
      description: 'The parser takes the token stream and organizes it into a hierarchical Abstract Syntax Tree (AST), ensuring grammar compliance.'
    }
  ];

  return (
    <Row className="py-5 mt-5">
      {features.map((feature, idx) => (
        <Col md={6} key={idx} className="mb-4">
          <Card className="glass-card h-100 p-4 border-0">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="p-3 bg-dark rounded-3 border-secondary">
                {feature.icon}
              </div>
              <h4 className="mb-0 fw-bold">{feature.title}</h4>
            </div>
            <p className="text-secondary mb-0 line-height-relaxed">
              {feature.description}
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};