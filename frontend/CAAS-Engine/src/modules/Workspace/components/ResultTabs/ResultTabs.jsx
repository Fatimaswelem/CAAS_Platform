import  { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TokenList from '../TokenList/TokenList';
import ASTViewer from '../ASTViewer/ASTViewer';
import ErrorPanel from '../ErrorPanel/ErrorPanel';

export default function ResultTabs({ results }){
  const [key, setKey] = useState('tokens');

  return (
    <div className="glass-card shadow-sm h-100 flex-grow-1 overflow-hidden d-flex flex-column">
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="result-tabs border-bottom border-secondary mb-0"
      >
        <Tab eventKey="tokens" title="Tokens">
          <TokenList tokens={results?.tokens} />
        </Tab>
        <Tab eventKey="ast" title="AST">
          <ASTViewer ast={results?.ast} />
        </Tab>
        <Tab eventKey="errors" title="Errors">
          <ErrorPanel errors={results?.errors} />
        </Tab>
      </Tabs>
      
      <div className="mt-auto p-3 border-top border-secondary bg-dark text-secondary d-flex justify-content-between align-items-center fs-xs ff-mono">
        <div className="d-flex align-items-center gap-2">
          <div className={`rounded-circle ${results ? 'bg-success' : 'bg-secondary'}`} style={{ width: 8, height: 8 }}></div>
          <span>{results ? 'COMPILATION SUCCESS' : 'READY TO ANALYZE'}</span>
        </div>
        {results?.submissionId != null && (
          <span className="text-secondary opacity-75">SUB #{results.submissionId}</span>
        )}
      </div>
    </div>
  );
};