/* eslint-disable react-hooks/set-state-in-effect */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HistoryAPI } from '../../../api';
import MainLayout from '../../Layout/components/MainLayout/MainLayout';
import Loader from '../../Shared/components/Loader/Loader';

const PAGE_SIZE = 10;

export default function History(){
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await HistoryAPI.GetUserHistory();
      
      const items = Array.isArray(response) ? response : (response.items ?? []);
      setHistory(items);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const totalCount = history.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  
  const paginatedHistory = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return history.slice(start, start + PAGE_SIZE);
  }, [history, page]);

  const startEntry = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endEntry = Math.min(page * PAGE_SIZE, totalCount);

  const isSuccess = (status) => status?.toLowerCase() === 'success';

  if (loading) {
    return <MainLayout><div className="py-5"><Loader /></div></MainLayout>;
  }

  return (
    <MainLayout>
      <div className="mb-4">
        <h2 className="fw-bold mb-1 tracking-tight">Analysis History</h2>
        <p className="text-secondary mb-0">Review previous compilation jobs and diagnostic reports across your cluster.</p>
      </div>

      <Card className="glass-card mb-4">
        <Card.Body className="p-0">
          <div className="p-3 border-bottom border-secondary d-flex align-items-center">
            <div className="rounded-circle bg-danger" style={{ width: 8, height: 8 }}></div>
            <div className="rounded-circle bg-warning mx-1" style={{ width: 8, height: 8 }}></div>
            <div className="rounded-circle bg-success" style={{ width: 8, height: 8 }}></div>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr className="text-secondary text-uppercase fs-xs tracking-widest border-secondary">
                  <th className="px-4 py-3">Submission ID</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Source Preview</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-end">Action</th>
                </tr>
              </thead>
              <tbody className="ff-mono fs-sm">
                {paginatedHistory.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-secondary py-5 fs-sm">
                      No submissions found.
                    </td>
                  </tr>
                ) : (
                  paginatedHistory.map((item) => (
                    <tr
                      key={item.submissionId}
                      className="border-secondary cursor-pointer"
                      onClick={() => navigate(`/history/${item.submissionId}`, { 
                        state: { submissionData: item }
                      })}
                    >
                      <td className="px-4 py-3 text-secondary">#{item.submissionId}</td>
                      <td className="px-4 py-3">
                        {item.submittedAt
                          ? new Date(item.submittedAt).toLocaleString()
                          : '—'}
                      </td>
                      <td className="px-4 py-3 opacity-50">{item.sourceCodePreview ?? '—'}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={`${isSuccess(item.status) ? 'bg-success' : 'bg-danger'} bg-opacity-10 border border-${isSuccess(item.status) ? 'success' : 'danger'} text-${isSuccess(item.status) ? 'success' : 'danger'} rounded-pill px-3 py-1 fs-xs`}
                        >
                          {item.status?.toUpperCase() ?? 'UNKNOWN'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <ChevronRight size={16} className="text-secondary" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-top border-secondary d-flex justify-content-between align-items-center">
            <span className="text-secondary fs-xs">
              {totalCount === 0
                ? 'No entries'
                : `Showing ${startEntry}–${endEntry} of ${totalCount} entries`}
            </span>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                className="border-secondary p-1"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                className="border-secondary p-1"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </MainLayout>
  );
};