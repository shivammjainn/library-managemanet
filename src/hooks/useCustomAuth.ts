"use client";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { User } from "@/provider/types/types";

export default function useCustomAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded: any = jwt.decode(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded && decoded.exp > now) {
        const username = decoded.username;
        const userEmail = decoded.userEmail;
        setIsAuthenticated(true);
        setUser({ username: decoded.username, admin: decoded.admin });

        fetch(`/api/get-role?email=${encodeURIComponent(userEmail)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          })
          .catch((err) => {
            console.error("Error fetching role:", err);
            setIsAdmin(false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    } catch (err) {
      console.error("Token decode error:", err);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
    }
  }, []);

  return { loading, isAuthenticated, user, isAdmin };
}
