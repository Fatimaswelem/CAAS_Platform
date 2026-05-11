import { Alert } from 'react-bootstrap';
import { AlertCircle } from 'lucide-react';

export default function ErrorPanel({ errors }) {
  if (!errors || errors.length === 0) {
    return (
      <div className="text-center py-5 text-success opacity-75">
        <p className="fs-sm">No diagnostic errors found.</p>
      </div>
    );
  }

  return (
    <div className="p-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <div className="d-flex align-items-center gap-2 mb-3 text-danger">
        <AlertCircle size={18} />
        <span className="fw-bold fs-sm tracking-tight text-uppercase">{errors.length} Syntax Errors Detected</span>
      </div>
      {errors.map((error, i) => (
        <Alert key={i} variant="danger" className="bg-danger bg-opacity-10 border-danger text-light py-2 px-3 ff-mono fs-xs mb-2">
          <span className="text-secondary me-2">L{error.line}:</span> {error.message}
        </Alert>
      ))}
    </div>
  );
};