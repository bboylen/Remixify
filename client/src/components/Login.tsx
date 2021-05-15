import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "antd";

const Login: React.FC = () => {
  const [data, setData] = useState(null);

  const loginToSpotify = () => {};

  return (
    <div className="Login">
      <Row justify={"center"} style={{ paddingTop: "200px" }}>
        <Col>
          <Card
            title="Login to Symphony"
            style={{ width: 300, textAlign: "center" }}
            headStyle={{ backgroundColor: "salmon" }}
          >
            <Button onClick={() => loginToSpotify} type={"primary"}>
              Login with Spotify
            </Button>
            <Button style={{ marginTop: "25px" }}>Login as guest</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
