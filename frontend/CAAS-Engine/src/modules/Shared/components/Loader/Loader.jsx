import { Spinner } from 'react-bootstrap';

export default function Loader ({ fullPage = false }) {
  const content = (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
      <div className="position-relative">
        <Spinner animation="border" style={{ width: '3rem', height: '3rem', color: '#00d2ff' }} />
        <Spinner animation="grow" className="position-absolute start-0 top-0" style={{ width: '3rem', height: '3rem', color: '#9d50bb', opacity: 0.3 }} />
      </div>
      <span className="text-secondary fs-xs text-uppercase tracking-widest animate-pulse">Initializing...</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
        {content}
      </div>
    );
  }

  return content;
};
