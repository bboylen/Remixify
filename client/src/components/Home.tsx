import React, { useContext } from "react";
import { Switch, Route, Link, useLocation, Redirect } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { UserContext } from "../util/UserContext";
import { Playlists } from "./Playlists";
import { StreamMusic } from "./StreamMusic";
import { useMediaQuery } from "react-responsive";
import { NavbarMenu } from "./Navbar/NavbarMenu";
import { NavbarDropdown } from "./Navbar/NavbarDropdown";

import "../styles/Home.css";

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  const user = useContext(UserContext);

  const location = useLocation();

  const DesktopNav = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 700 });
    return isDesktop ? children : null;
  };
  const PhoneNav = ({ children }: any) => {
    const isPhone = useMediaQuery({ maxWidth: 699 });
    return isPhone ? children : null;
  };

  const logoutUser = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3001/auth/logout", "_self");
  };

  // Need to check auth on routes!!!

  return (
    <div className="main">
      <Layout>
        <Header id="main-header" style={{ textAlign: "left" }}>
          <h1
            className="logo"
            style={{ display: "inline-block", color: "white" }}
          >
            Symphony
          </h1>
          <DesktopNav>
            <NavbarMenu location={location} />
          </DesktopNav>
          <PhoneNav>
            <NavbarDropdown location={location} />
          </PhoneNav>
          <Button
            type="primary"
            onClick={logoutUser}
            style={{
              position: "absolute",
              right: "10%",
              top: "16px",
            }}
          >
            Logout
          </Button>
        </Header>
        <Content>
          <Switch>
            <Route path="/listen">
              <StreamMusic />
            </Route>
            <Route path="/playlists">
              <Playlists user={user} />
            </Route>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/listen" />;
              }}
            />
          </Switch>
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
