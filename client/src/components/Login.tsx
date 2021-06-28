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
        <Row justify={"center"} style={{ paddingTop: "15%" }}>
          <Col>
            <Card
              title="Login to Symphony"
              style={{ width: 300, textAlign: "center" }}
              headStyle={{ backgroundColor: '#043059', color: 'white', fontSize: '20px' }}
            >
              <Button onClick={loginToSpotify} type={"primary"} style={{fontSize: '15px'}}>
                Login with Spotify
              </Button>
            </Card>
          </Col>
        </Row>
    </div>
  );
};

export default Login;
