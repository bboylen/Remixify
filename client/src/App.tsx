import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import { UserContext } from "./util/UserContext";
import { AuthContext } from "./util/AuthContext";
import { EnvContext } from "./util/EnvContext";
import { BrowserRouter as Router } from "react-router-dom";
import { User } from "./util/types";

import "./App.less";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<Boolean>(false);
  const [user, setUser] = useState<User>({
    username: "",
    accessToken: "",
    refreshToken: "",
    displayName: "",
    spotifyId: "",
    profileImageUrl: "",
  });
  const [clientURL, setClientUrl] = useState<string>(
    process.env.NODE_ENV === "production"
      ? "https://still-peak-57686.herokuapp.com"
      : "http://localhost:3001"
  );
  const [loading, setLoading] = useState<Boolean>(true);

  const authenticateUser = async () => {
    await fetch("http://localhost:3001/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate the user");
      })
      .then((responseJson) => {
        setAuthenticated(true);
        setUser(responseJson.user);
      })
      .catch((error) => {
        console.log(error);
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (loading) return null;

  return (
    <Router>
      <UserContext.Provider value={user}>
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
          <EnvContext.Provider value={clientURL}>
            <div className="App" style={{ overflow: "hidden" }}>
              {!authenticated ? <Login /> : <Home />}
            </div>
          </EnvContext.Provider>
        </AuthContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
