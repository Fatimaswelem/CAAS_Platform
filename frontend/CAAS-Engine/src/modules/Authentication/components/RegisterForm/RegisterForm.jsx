import { Form, Button, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Loader2 } from 'lucide-react';

const RegisterForm = ({ onSubmit, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label className="text-secondary fs-xs text-uppercase tracking-wider">Email Address</Form.Label>
        <InputGroup>
          <InputGroup.Text className="bg-dark border-secondary">
            <Mail size={16} className="text-secondary" />
          </InputGroup.Text>
          <Form.Control
            type="email"
            className="bg-dark text-white border-secondary"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Row>
          <Form.Group className="mb-3">
            <Form.Label className="text-secondary fs-xs text-uppercase tracking-wider">Password</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-dark border-secondary">
                <Lock size={16} className="text-secondary" />
              </InputGroup.Text>
              <Form.Control
                type="password"
                className="bg-dark text-white border-secondary"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Minimum 8 characters' }
                })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
      </Row>
      <Button 
        type="submit" 
        className="btn-primary-custom w-100 py-3 mb-3 d-flex align-items-center justify-content-center gap-2"
        disabled={loading}
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        <span>Register Account</span>
      </Button>
    </Form>
  );
};

export default RegisterForm;
