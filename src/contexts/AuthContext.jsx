import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cakedbyadorable_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cakedbyadorable_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cakedbyadorable_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: Date.now(),
        email,
        firstName: email.split('@')[0],
        lastName: 'User',
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now(),
        email,
        firstName,
        lastName,
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now(),
        email: 'user@gmail.com',
        firstName: 'Google',
        lastName: 'User',
        provider: 'google',
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      googleLogin,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
