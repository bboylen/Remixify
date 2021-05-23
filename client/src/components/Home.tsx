import React, { useContext } from "react";
import { Switch, Route, Link, useLocation, Redirect } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { UserContext } from "../util/UserContext";
import { Playlists } from "./Playlists";
import { StreamMusic } from "./StreamMusic";
import '../styles/Home.css';

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  const user = useContext(UserContext);

  const location = useLocation();

  const logoutUser = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3001/auth/logout", "_self");
  };

  // Need to check auth on routes!!!

  return (
    <div className="main">
      <Layout>
        <Header id="main-header" style={{ textAlign: "left" }}>
          <h1 className="logo" style={{ display: "inline-block", color: 'white', }}>
            Symphony
          </h1>
          <Menu
            id="header-nav"
            style={{
              display: "inline-block",
              marginLeft: "100px",
              position: 'relative',
              top: '-3px',
              height: "64px",
            }}
            theme="dark"
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
          <Button type='primary' onClick={logoutUser} style={{
            position: 'absolute',
            right: '100px',
            top: '16px'
          }}>Logout</Button>
        </Header>
        <Content>
          <Switch>
            <Route path="/listen">
              <StreamMusic />
            </Route>
            <Route path="/playlists">
              <Playlists user={user}/>
            </Route>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/listen" />
              }}
            />
          </Switch>
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
