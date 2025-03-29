import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './features/auth/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;