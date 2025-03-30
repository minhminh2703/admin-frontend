import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './features/login/login';
import { ManageAccounts } from '@mui/icons-material';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path='/manage_acocunts' element={<ManageAccounts />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;