import React, { useContext } from "react";
import { Card, Button, Row, Col } from "antd";
import { UserContext } from '../util/UserContext';

const Home: React.FC = () => {
  // user interface
  const user = useContext(UserContext);
  console.log(user);
  
  return (
    <div className="Login">
        <Row justify={"center"} style={{ paddingTop: "200px" }}>
          <Col>
            <h1>Welcome</h1>
          </Col>
        </Row>
    </div>
  );
};

export default Home;
