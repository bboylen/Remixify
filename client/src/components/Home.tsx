import React, { useContext } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { UserContext } from "../util/UserContext";
import { Playlists } from "./Playlists";
import { StreamMusic } from "./StreamMusic";

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  // user interface
  const user = useContext(UserContext);

  const location = useLocation();
  console.log(location);

  const logoutUser = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3001/auth/logout", "_self");
  };
  return (
    <div className="main">
      <Layout>
        <Header style={{ backgroundColor: "salmon", textAlign: "left" }}>
          <h1 className="logo" style={{ display: "inline-block" }}>
            Symphony
          </h1>
          <Menu
            style={{
              display: "inline-block",
              backgroundColor: "salmon",
              marginLeft: "100px",
              height: "63px",
            }}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["/listen"]}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="/listen">
              <Link to="/listen">Listen</Link>
            </Menu.Item>
            <Menu.Item key="/playlists">
              <Link to="/playlists">Playlists</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route path="/listen">
              <StreamMusic />
            </Route>
            <Route path="/playlists">
              <Playlists />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </div>
  );
};

export default Home;

{
  /* <PageHeader
        className="site-page-header"
        title="Symphony"
        extra={[
          <Button key="1" onClick={logoutUser}>Logout</Button>
        ]}
        >
        </PageHeader> */
}
