import React, { useContext } from "react";
import { Card, Button, Row, Col } from "antd";
import { EnvContext } from "../util/EnvContext";

const Login: React.FC = () => {
  const serverURL = useContext(EnvContext);

  const loginToSpotify = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(`${serverURL}/auth/spotify`, "_self");
  };

  return (
    <div className="Login">
        <Row justify={"center"} style={{ paddingTop: "15%" }}>
          <Col>
            <Card
              title="Login to Remixify"
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
