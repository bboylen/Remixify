import React, { useState, useEffect, createContext } from "react";
import Login from "./components/Login";
import Home from './components/Home';
import { UserContext } from './util/UserContext';
import "./App.less";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<Boolean>(false);
  const [user, setUser] = useState<Object>({});
  const [loading, setLoading] = useState<Boolean>(true);

  // add useContext to store User state

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

  // need to add auth context, that way if auth changes they user gets booted back to the login page!
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        {!authenticated ? <Login /> : <Home />}
      </div>
    </UserContext.Provider>
  );
};

export default App;
