import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthCheckerProps {
  children: React.ReactNode;
  url : string,
}

const AuthChecker: React.FC<AuthCheckerProps> = ( { url,  children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    
    const token = localStorage.getItem('auth');

   if (token) {
      setIsAuthenticated(true);
    } else {
      router.push(url); 
    }
  }, []);

    if (!isAuthenticated) {
    return null; 
  }

  
  return children; 
};

export default AuthChecker;
