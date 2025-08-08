import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getAccessToken = useCallback(
    () => localStorage.getItem("accessToken"),
    []
  );
  const getRefreshToken = useCallback(
    () => localStorage.getItem("refreshToken"),
    []
  );

  const setTokens = useCallback((accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);
  }, [getAccessToken]);

  return {
    isLoggedIn,
    getAccessToken,
    getRefreshToken,
    setTokens,
    logout,
  };
};
