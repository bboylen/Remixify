import React, { useContext, useState } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { Layout, Button } from "antd";
import { UserContext } from "../util/UserContext";
import { Playlists } from "./Playlists";
import { StreamMusic } from "./StreamMusic";
import { useMediaQuery } from "react-responsive";
import { NavbarMenu } from "./Navbar/NavbarMenu";
import { NavbarDropdown } from "./Navbar/NavbarDropdown";

import "../styles/Home.css";

const { Header, Content } = Layout;

const Home: React.FC = () => {
  const [isPhone, setIsPhone] = useState<boolean>();

  const user = useContext(UserContext);
  const location = useLocation();

  const DesktopNav = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 700 });
    return isDesktop ? children : null;
  };
  const PhoneNav = ({ children }: any) => {
    const isPhone = useMediaQuery({ maxWidth: 699 });
    setIsPhone(isPhone);
    return isPhone ? children : null;
  };

  const logoutUser = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3001/auth/logout", "_self");
  };

  // Need to check auth on routes!!!

  return (
    <div className="main">
      <Layout style={{height: '100vh'}}>
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
              <Playlists user={user} isPhone={isPhone}/>
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
