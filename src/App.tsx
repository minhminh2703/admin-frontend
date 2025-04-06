import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './features/login';
import { ManageAccounts } from '@mui/icons-material';
import { AuthProvider } from './context/auth-context';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path='/manage_acocunts' element={<ManageAccounts />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;