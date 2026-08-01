"use client";

import Cookies from "js-cookie";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {

  token: string | null;

  authenticated: boolean;

  login(token: string): void;

  logout(): void;

}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType,
  );



export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    const stored =
      Cookies.get("accessToken");

    if (stored) {

      setToken(stored);

    }

    setLoading(false);

  }, []);




  function login(
    token: string,
  ) {

    Cookies.set(
      "accessToken",
      token,
      {
        expires: 7,
      },
    );

    setToken(token);

  }



  function logout() {

    Cookies.remove("accessToken");

    setToken(null);

  }



  if (loading) {

    return null;

  }



  return (

    <AuthContext.Provider
      value={{

        token,

        authenticated: !!token,

        login,

        logout,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth() {

  return useContext(AuthContext);

}