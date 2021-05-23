import React, { useContext } from "react";
import { Card, Button, Row, Col } from "antd";
import { UserContext } from '../util/UserContext';

const Login: React.FC = () => {
  const user = useContext(UserContext);

  const loginToSpotify = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3001/auth/spotify", "_self");
  };

  return (
    <div className="Login">
        <Row justify={"center"} style={{ paddingTop: "200px" }}>
          <Col>
            <Card
              title="Login to Symphony"
              style={{ width: 300, textAlign: "center" }}
              headStyle={{ backgroundColor: '#001529', color: 'white' }}
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
    </div>
  );
};

export default Login;
