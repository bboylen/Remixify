import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "antd";

const Login: React.FC = () => {
  // user interface

  const [authenticated, setAuthenticated] = useState<Boolean>(false);
  const [user, setUser] = useState<Object>(false);

  useEffect(() => {
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
          throw new Error("failed to authenticate user");
        })
        .then((responseJson) => {
          setAuthenticated(true);
          setUser(responseJson.user);
        })
        .catch((error) => {
          setAuthenticated(false);
          throw new Error("failed 2 authenticate user");
        });
    }
    authenticateUser();
  }, []);

  const loginToSpotify = (e: any) => {
    //What do I add here?
    e.preventDefault();
    window.open("http://localhost:3001/auth/spotify", "_self");
  };

  return (
    <div className="Login">
      {authenticated ? (
        <h1> Welcome</h1>
      ) : (
        <Row justify={"center"} style={{ paddingTop: "200px" }}>
          <Col>
            <Card
              title="Login to Symphony"
              style={{ width: 300, textAlign: "center" }}
              headStyle={{ backgroundColor: "salmon" }}
            >
              <Button onClick={loginToSpotify} type={"primary"}>
                Login with Spotify
              </Button>
              <Button type={"default"} style={{ marginTop: "25px" }}>
                Login as guest
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Login;
