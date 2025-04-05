import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './features/login';
import { ManageAccounts } from '@mui/icons-material';
import { AuthProvider } from './context/auth-context';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path='/manage_acocunts' element={<ManageAccounts />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;