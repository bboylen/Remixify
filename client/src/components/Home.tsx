import React, { useContext } from "react";
import { PageHeader, Card, Button, Row, Col } from "antd";
import { UserContext } from '../util/UserContext';

const Home: React.FC = () => {
  // user interface
  const user = useContext(UserContext);
  
  const logoutUser = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3001/auth/logout", "_self");
  };
  return (
    <div className="Home">
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Symphony"
        extra={[
          <Button key="1" onClick={logoutUser}>Logout</Button>
        ]}
        />
        <Row justify={"center"} style={{ paddingTop: "200px" }}>
          <Col>
            <h1>Welcome</h1>
          </Col>
        </Row>
    </div>
  );
};

export default Home;
