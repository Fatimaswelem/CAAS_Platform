export default function CodeEditor ({ value, onChange }){
  return (
    <div className="position-relative">
      <div className="d-flex align-items-center gap-2 mb-2">
        <div className="d-flex gap-1">
          <div className="rounded-circle bg-danger" style={{ width: 8, height: 8 }}></div>
          <div className="rounded-circle bg-warning" style={{ width: 8, height: 8 }}></div>
          <div className="rounded-circle bg-success" style={{ width: 8, height: 8 }}></div>
        </div>
      </div>
      <textarea
        className="code-editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="// Write your code here..."
        spellCheck="false"
      />
    </div>
  );
};