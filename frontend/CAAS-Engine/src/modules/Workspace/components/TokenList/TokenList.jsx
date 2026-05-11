import { Table } from 'react-bootstrap';

export default function TokenList({ tokens }){
  if (!tokens || tokens.length === 0) {
    return (
      <div className="text-center py-5 text-secondary">
        <p className="fs-sm">Run analysis to view token stream.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <Table variant="dark" hover className="mb-0 border-secondary" size="sm">
        <thead className="sticky-top bg-dark">
          <tr className="text-secondary text-uppercase fs-xs tracking-wider">
            <th>Type</th>
            <th>Lexeme</th>
            <th>Literal</th>
            <th>Line</th>
          </tr>
        </thead>
        <tbody className="fs-sm ff-mono">
          {tokens.map((token, i) => (
            <tr key={i} className="border-secondary">
              <td><span className="text-purple">{token.type}</span></td>
              <td><span className="text-cyan">{token.lexeme}</span></td>
              <td><span className="text-warning">{token.literal === null ? 'null' : String(token.literal)}</span></td>
              <td><span className="text-secondary">{token.line}</span></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};