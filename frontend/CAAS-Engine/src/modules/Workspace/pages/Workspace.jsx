import  { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MainLayout from '../../Layout/components/MainLayout/MainLayout';
import CodeEditor from '../components/CodeEditor/CodeEditor';
import ResultTabs from '../components/ResultTabs/ResultTabs';
import { Play, RotateCcw, Loader2 } from 'lucide-react';
import { AnanlyzerAPI } from '../../../api';

export default function Workspace(){
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.warn('requires source input!');
      return;
    }

    setLoading(true);

    try {
      const response = await AnanlyzerAPI.Analyze(code);

      const data = response.data;

      setResults({
        tokens: data.tokens ?? [],
        ast: data.ast ?? [],
        errors: data.errors ?? [],
        submissionId: data.submissionId,
        timestamp: data.timestamp,
      });

      toast.success('Analysis complete. Pipeline stabilized.');

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        err.message ||
        'Pipeline error. Compilation aborted.'
      );

      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setCode('');
    toast.info('Reset complete.');
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Analyzer Console</h2>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={handleReset} className="border-secondary text-white d-flex align-items-center gap-2">
            <RotateCcw size={16} />
            <span>Reset</span>
          </Button>
          <Button 
            className="btn-primary-custom d-flex align-items-center gap-2 px-4" 
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            <span>Run Analysis</span>
          </Button>
        </div>
      </div>

      <Row className="g-4">
        <Col lg={7}>
          <CodeEditor value={code} onChange={setCode} />
        </Col>
        
        <Col lg={5}>
           <ResultTabs results={results} />
        </Col>
      </Row>
    </MainLayout>
  );
};