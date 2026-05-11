import { Form, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginForm ({ onSubmit, loading }){
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

      <Form.Group className="mb-4">
        <div className="d-flex justify-content-between">
          <Form.Label className="text-secondary fs-xs text-uppercase tracking-wider">Password</Form.Label>
        </div>
        <InputGroup>
          <InputGroup.Text className="bg-dark border-secondary">
            <Lock size={16} className="text-secondary" />
          </InputGroup.Text>
          <Form.Control
            type="password"
            className="bg-dark text-white border-secondary"
            {...register('password', { required: 'Password is required' })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Button 
        type="submit" 
        className="btn-primary-custom w-100 py-3 mb-3 d-flex align-items-center justify-content-center gap-2"
        disabled={loading}
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        <span>Login</span>
      </Button>
    </Form>
  );
};