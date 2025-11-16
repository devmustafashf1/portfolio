import { useNavigate } from 'react-router-dom';
import Login from '../components/login';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Login 
      onBack={() => navigate('/')} 
      onLoginSuccess={() => navigate('/admin')}
    />
  );
}