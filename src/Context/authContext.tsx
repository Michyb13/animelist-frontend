import { ReactNode, useState, createContext, useEffect } from "react";
type ContextProps = {
  children: ReactNode;
};
type Response = {
  user: string;
  token: string;
};
type authContextProps = {
  user: Response | string;
  login: (response: Response) => void;
  logout: () => void;
};
export const authContext = createContext<authContextProps | null>(null);
const AuthContextProvider = (props: ContextProps) => {
  const [user, setUser] = useState<Response | string>("");

  useEffect(() => {
    const userDataT: string | null = JSON.parse(localStorage.getItem("user"));
    if (userDataT !== null) {
      const userData = userDataT;
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  const login = (response: Response) => {
    setUser(response);
  };

  const logout = () => {
    setUser("");
    localStorage.clear();
  };

  const exports = {
    user,
    login,
    logout,
  };
  return (
    <authContext.Provider value={exports}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
