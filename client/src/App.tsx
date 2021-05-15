import React, { useState, useEffect } from "react";
import Login from './components/Login';
import "./App.less";

const App:React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  // How to check if logged in??? cookie, db 
  // if logged in -> home
  // if not logged in -> auth
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
