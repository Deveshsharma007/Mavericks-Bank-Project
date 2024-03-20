import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}; 
export const useAuth = () => useContext(AuthContext);
