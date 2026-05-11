import React from 'react';
import { ChevronRight, ChevronDown, Circle, ArrowRight } from 'lucide-react';

const ASTNode = ({ node }) => {
  const [expanded, setExpanded] = React.useState(true);

  if (!node) return null;

  const hasChildren = Array.isArray(node.children) || Array.isArray(node.arguments) || node.body != null || node.value != null;

  const renderContent = () => {
    if (!expanded) return null;

    switch (node.type) {
      case 'LiteralNode':
        return (
          <div className="ms-3">
            <span className="text-secondary fs-xs">value: </span>
            <span className="text-warning">{JSON.stringify(node.value)}</span>
          </div>
        );

      case 'IdNode':
        return (
          <div className="ms-3">
            <span className="text-secondary fs-xs">name: </span>
            <span className="text-cyan">{node.name}</span>
          </div>
        );

      case 'ApplicationNode':
        return (
          <div className="ms-3">
            {node.operator != null && (
              <div className="mb-1">
                <span className="text-secondary fs-xs">operator: </span>
                <span className="text-purple fw-bold">"{node.operator}"</span>
              </div>
            )}

            {node.function && (
              <div className="mb-1">
                <span className="text-secondary fs-xs">function:</span>
                <div className="ms-2">
                  <ASTNode node={node.function} />
                </div>
              </div>
            )}
            {Array.isArray(node.arguments) && node.arguments.length > 0 && (
              <div>
                <span className="text-secondary fs-xs">arguments:</span>
                <div className="ms-2">
                  {node.arguments.map((arg, i) => (
                    <div key={i} className="d-flex align-items-start gap-2 mb-1">
                      <ArrowRight size={10} className="text-secondary mt-1 flex-shrink-0" />
                      <ASTNode node={arg} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'LetNode':
        return (
          <div className="ms-3">
            <div className="mb-1">
              <span className="text-secondary fs-xs">name: </span>
              <span className="text-cyan">{node.name}</span>
            </div>
            <div className="mb-1">
              <span className="text-secondary fs-xs">value:</span>
              <div className="ms-2">
                <ASTNode node={node.value} />
              </div>
            </div>
            {node.body && (
              <div>
                <span className="text-secondary fs-xs">body:</span>
                <div className="ms-2">
                  <ASTNode node={node.body} />
                </div>
              </div>
            )}
          </div>
        );

      default:
        if (Array.isArray(node.children)) {
          return (
            <div className="ms-3">
              {node.children.map((child, i) => (
                <ASTNode key={i} node={child} />
              ))}
            </div>
          );
        }
        return (
          <div className="ms-3">
            {Object.entries(node)
              .filter(([k]) => k !== 'type')
              .map(([k, v]) => (
                <div key={k} className="mb-1">
                  <span className="text-secondary fs-xs">{k}: </span>
                  {typeof v === 'object' && v !== null ? (
                    <ASTNode node={v} />
                  ) : (
                    <span className="text-warning">{JSON.stringify(v)}</span>
                  )}
                </div>
              ))}
          </div>
        );
    }
  };

  return (
    <div className="mb-2">
      <div
        className="d-flex align-items-center gap-2 cursor-pointer hover-bg-light p-1 rounded"
        onClick={() => setExpanded(!expanded)}
        style={{ userSelect: 'none' }}
      >
        {hasChildren ? (
          expanded
            ? <ChevronDown size={14} className="text-secondary flex-shrink-0" />
            : <ChevronRight size={14} className="text-secondary flex-shrink-0" />
        ) : (
          <Circle size={4} fill="currentColor" className="text-secondary ms-1 flex-shrink-0" />
        )}
        <span className="ff-mono fw-bold text-white fs-sm">{node.type}</span>
      </div>
      {renderContent()}
    </div>
  );
};

const ASTViewer = ({ ast }) => {
  const nodes = Array.isArray(ast) ? ast : ast ? [ast] : [];

  if (nodes.length === 0) {
    return (
      <div className="text-center py-5 text-secondary">
        <p className="fs-sm">Run analysis to build syntax tree.</p>
      </div>
    );
  }

  return (
    <div className="ast-container p-3 ff-mono" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      {nodes.map((node, i) => (
        <ASTNode key={i} node={node} />
      ))}
    </div>
  );
};

export default ASTViewer;