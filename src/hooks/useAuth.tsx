import { createContext, useContext, useState } from "react";


// Define the types for your context
interface AuthContextType {
  isUserLoggedIn: boolean;

  login: (data: User) => void;
  logout: () => void;
  adminLogout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
  
}

interface User {
  id: number;
  name: string;
  code: string;
  role: string;
  token: string;
}

// Initialize the context with a proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const login = (data: User) => {
    setIsUserLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(data));
    //window.location.href = "/";
  };

  const logout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  const adminLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Handle the case when the context is not provided
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
