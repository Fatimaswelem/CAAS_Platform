import { Container } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/Navbar';

const NAVBAR_HEIGHT = '56px';

export default function MainLayout({ children, hideSidebar = false }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />

      <div className="d-flex flex-grow-1">
        {!hideSidebar && (
          <>
            {/* Spacer keeps main content pushed right */}
            <div style={{ width: '260px', flexShrink: 0 }} />

            {/* Fixed sidebar — starts below the navbar */}
            <div
              style={{
                position: 'fixed',
                top: NAVBAR_HEIGHT,
                left: 0,
                width: '260px',
                height: `calc(100vh - ${NAVBAR_HEIGHT})`,
                zIndex: 100,
              }}
            >
              <Sidebar />
            </div>
          </>
        )}

        <main className="flex-grow-1 p-4" style={{ backgroundColor: '#0f111a' }}>
          <Container fluid>
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}