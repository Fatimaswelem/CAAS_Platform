import { AlertTriangle, ArrowRight, ChevronLeft, Circle, FileCode, Workflow } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../Layout/components/MainLayout/MainLayout';

const ASTNodeCard = ({ node, depth = 0 }) => {
  const [open, setOpen] = useState(true);
  if (!node) return null;

  const hasChildren =
    Array.isArray(node.arguments) ||
    Array.isArray(node.children) ||
    node.body != null ||
    node.value != null;

  const typeColor = () => {
    switch (node.type) {
      case 'ApplicationNode': return 'text-info';
      case 'LiteralNode': return 'text-warning';
      case 'IdNode': return 'text-primary';
      default: return 'text-secondary';
    }
  };

  const label = () => {
    if (node.type === 'ApplicationNode' && node.operator) return `${node.type} "${node.operator}"`;
    if (node.type === 'LiteralNode') return `${node.type}: ${JSON.stringify(node.value)}`;
    if (node.type === 'IdNode') return `${node.type}: ${node.name}`;
    return node.type;
  };

  const childNodes = node.arguments ?? node.children ?? [];

  return (
    <div style={{ marginLeft: depth * 16 }}>
      <div
        className={`d-flex align-items-center gap-1 p-1 rounded cursor-pointer ff-mono fs-xs ${typeColor()}`}
        onClick={() => setOpen((o) => !o)}
        style={{ userSelect: 'none', width: 'fit-content' }}
      >
        {hasChildren
          ? <span className="text-secondary" style={{ fontSize: 10 }}>{open ? '▾' : '▸'}</span>
          : <Circle size={4} fill="currentColor" className="text-secondary ms-1" />}
        <span
          className="border border-secondary rounded bg-dark px-2 py-1"
          style={{ whiteSpace: 'nowrap' }}
        >
          {label()}
        </span>
      </div>

      {open && childNodes.length > 0 && (
        <div className="ms-2 mt-1" style={{ borderLeft: '1px solid #444', paddingLeft: 8 }}>
          {childNodes.map((child, i) => (
            <div key={i} className="d-flex align-items-start gap-1 mt-1">
              <ArrowRight size={10} className="text-secondary mt-1 flex-shrink-0" />
              <ASTNodeCard node={child} depth={0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function HistoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const details = location.state?.submissionData;

  if (!details) {
    return (
      <MainLayout>
        <div className="text-center py-5">
          <div className="mb-4">
            <AlertTriangle size={48} className="text-warning mb-3" />
            <h4 className="text-white">Submission Data Unavailable</h4>
            <p className="text-secondary fs-sm mx-auto" style={{ maxWidth: '400px' }}>
              To view details for submission #{id}, please select it from the history list. 
              The session data is cleared upon page refresh.
            </p>
          </div>
          <Button 
            variant="outline-light" 
            size="sm" 
            onClick={() => navigate('/history')}
            className="border-secondary px-4"
          >
            Return to History
          </Button>
        </div>
      </MainLayout>
    );
  }

  const isSuccess = details.status?.toLowerCase() === 'success';
  const astNodes  = Array.isArray(details.ast) ? details.ast : details.ast ? [details.ast] : [];
  const tokens    = details.tokens ?? [];
  const errors    = Array.isArray(details.errors) ? details.errors : [];
  
  const formattedDate = details.submittedAt
    ? new Date(details.submittedAt).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      })
    : '—';

  return (
    <MainLayout>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="outline-secondary" size="sm" onClick={() => navigate('/history')} className="border-secondary p-1">
          <ChevronLeft size={20} className="text-white" />
        </Button>
        <div>
          <h2 className="fw-bold mb-0">
            Submission #{details.submissionId}{' '}
            <Badge className={`${isSuccess ? 'bg-success' : 'bg-danger'} bg-opacity-10 ${isSuccess ? 'text-success border-success' : 'text-danger border-danger'} border fs-xs ms-2 px-2`}>
              <span className="ff-mono">{details.status?.toUpperCase() ?? 'UNKNOWN'}</span>
            </Badge>
          </h2>
          <p className="text-secondary fs-xs mb-0">Compiled on {formattedDate}</p>
        </div>
      </div>
      <Row className="g-4">
        <Col lg={8}>
          <Card className="glass-card mb-4 border-secondary overflow-hidden">
            <div className="bg-dark px-3 py-2 border-bottom border-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <FileCode size={16} className="text-secondary" />
                <span className="ff-mono fs-xs text-secondary uppercase tracking-widest">Source Input</span>
              </div>
            </div>
            <div className="p-0">
              <pre className="m-0 p-4 ff-mono fs-sm text-light bg-black" style={{ minHeight: '120px', overflowX: 'auto' }}>
                <code>
                  {(details.sourceCodePreview ?? 'No source code available.').split('\n').map((line, i) => (
                    <div key={i} className="d-flex">
                      <span className="text-secondary opacity-30 text-end me-4" style={{ minWidth: '30px', userSelect: 'none' }}>{i + 1}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </Card>
          <Row className="g-4">
            <Col md={6}>
              <Card className="glass-card p-3 border-secondary h-100">
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom border-secondary pb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-xs fw-bold text-uppercase tracking-widest">Token Stream</span>
                  </div>
                  <Badge className="bg-dark border border-secondary text-secondary fs-xs rounded-1">
                    {tokens.length} Tokens
                  </Badge>
                </div>
                <div className="d-flex flex-wrap gap-2 align-content-start" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {tokens.length === 0 ? (
                    <span className="text-secondary fs-xs">No tokens generated.</span>
                  ) : (
                    tokens.map((token, i) => (
                      <div key={i} className="p-2 border border-secondary rounded bg-dark d-flex flex-column" style={{ minWidth: '80px' }}>
                        <span className="text-secondary text-uppercase" style={{ fontSize: '10px' }}>{token.type}</span>
                        <span className="ff-mono text-white fs-xs">{token.lexeme}</span>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="glass-card p-3 border-secondary h-100">
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom border-secondary pb-2">
                  <div className="d-flex justify-content-between align-items-center gap-2 w-100">
                    <span className="fs-xs fw-bold text-uppercase tracking-widest">AST Visualization</span>
                    <Workflow size={16} className="text-secondary"/>
                  </div>
                </div>
                <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '400px' }}>
                  {astNodes.length === 0 ? (
                    <div className="text-center text-secondary fs-xs py-4">No AST data.</div>
                  ) : (
                    astNodes.map((node, i) => (
                      <div key={i} className={i > 0 ? 'mt-3 pt-3 border-top border-secondary' : ''}>
                        <ASTNodeCard node={node} />
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Card className="glass-card border-secondary h-100">
            <div className="bg-dark px-3 py-2 border-bottom border-secondary d-flex justify-content-between align-items-center rounded-4">
              <span className="fs-sm fw-bold tracking-tight text-uppercase py-1">Diagnostics</span>
              <FileCode size={16} className="text-secondary" />
            </div>
            <div className="p-3" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              {errors.length === 0 ? (
                <div className="text-center py-5">
                  <Circle size={32} className="text-success mb-2 opacity-25" />
                  <p className="text-success opacity-75 fs-sm">Clear: No errors</p>
                </div>
              ) : (
                errors.map((err, i) => (
                  <Card key={i} className="bg-danger bg-opacity-10 border-danger p-3 mb-3">
                    <div className="d-flex align-items-start gap-3">
                      <AlertTriangle size={18} className="text-danger mt-1 flex-shrink-0" />
                      <div>
                        <h6 className="text-danger fw-bold fs-sm mb-1">
                          {err.type ?? `Error #${i + 1}`}
                        </h6>
                        <p className="text-light fs-xs mb-1 opacity-75">{err.message}</p>
                        {err.line != null && (
                          <span className="text-secondary ff-mono fs-xs">Line: {err.line}</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
}