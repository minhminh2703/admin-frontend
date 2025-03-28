import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './features/auth/auth';

function App() {
  return (
    <Router>
        <div>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;