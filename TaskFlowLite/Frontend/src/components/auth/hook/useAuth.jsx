import { AuthContext } from "../../../store/AuthContext";
import { useContext } from "react";
import { register, login, logout } from "../../../services/post.api";
import { getMe } from "../../../services/get.api";

export const useAuth = () => {
  const { setUser, setLoading } = useContext(AuthContext);

  const handleRegister = async ({ email, password, username }) => {
    try {
      setLoading(true);
      const data = await register({ email, password, username });
      setUser(data.user);
    }finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      setUser(data.user);
    
    }finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
    }finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
    }finally {
      setLoading(false);
    }
  };

  return {
    handleGetMe,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
