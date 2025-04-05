import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './features/login';
import { ManageAccounts } from '@mui/icons-material';
import { AuthProvider } from './context/auth-context';
import MainLayout from './layouts/main_layout/MainLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<MainLayout />}>
            <Route path="/manage_accounts" element={<ManageAccounts />} />
            <Route path="/dashboard" element={<ManageAccounts />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;