import React, { useContext, createContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { TOKEN_ID } from "../utils/constants";
import axios from "axios";
import Loading from "../components/Loading";
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let tokenid = localStorage.getItem(TOKEN_ID);
    if (tokenid && !user) {
      setLoading(true);
      axios({
        method: "get",
        url: `https://primus-alumni-portal.herokuapp.com/api/auth/user/${tokenid}`,
      }).then((result) => {
        if (result.data.success) {
          setLoading(false);
          setUser(result.data.data);
          history.push(location);
        } else {
          console.log("no token found");
          setLoading(false);
          history.push("/login");
        }
      });
    }
    if (!user) {
      if (user) console.log("use effect gettokensetuser success");
      else {
        console.log("use effect gettokensetuser success");
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }

  const login = (user, jwttoken) => {
    console.log("in login auth");
    setUser(user);
    localStorage.setItem(TOKEN_ID, jwttoken);
  };

  const logout = () => {
    console.log("logg");
    try {
      setUser(null);
      localStorage.removeItem(TOKEN_ID);
      history.push("/login");
    } catch (err) {
      throw err;
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
