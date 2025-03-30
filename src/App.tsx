import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './features/login/login';
import { ManageAccounts } from '@mui/icons-material';
import MainLayout from './layouts/main_layout/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<MainLayout />}>
          <Route path="/manage_accounts" element={<ManageAccounts />} />
          <Route path="/dashboard" element={<ManageAccounts />} />
          {/* Add other routes that require Sidebar, Navbar, and Background */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;