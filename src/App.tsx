import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './features/login';
import ManageAccounts from './features/manage-accounts';
import Dashboard from './features/dashboard';
import { AuthProvider } from './context/auth-context';
import MainLayout from './layouts/main-layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<MainLayout />}>
            <Route path="/manage_accounts" element={<ManageAccounts />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

