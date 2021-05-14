import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./App.less";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
