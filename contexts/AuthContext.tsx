import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'provider';
  avatar: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from global state or secure storage)
    const checkAuthState = () => {
      try {
        console.log('Checking auth state, global.userData:', global.userData);
        if (global.userData && global.userData.isLoggedIn) {
          console.log('Found stored user data, setting user:', global.userData);
          setUser(global.userData);
        } else {
          console.log('No stored user data found');
        }
      } catch (error) {
        console.log('Error checking auth state:', error);
      } finally {
        console.log('Setting isLoading to false');
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = (userData: User) => {
    console.log('AuthContext login called with:', userData);
    setUser(userData);
    global.userData = userData;
    console.log('User state updated, user:', userData);
  };

  // Log user state changes
  useEffect(() => {
    console.log('AuthContext user state changed:', user);
  }, [user]);

  const logout = () => {
    console.log('AuthContext logout called');
    setUser(null);
    global.userData = null;
    console.log('User data cleared from global state');
    console.log('Current user state after logout:', null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
