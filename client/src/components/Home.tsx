import React, { ReactElement, useContext, useState } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { Layout, Button } from "antd";
import { UserContext } from "../util/UserContext";
import { EnvContext } from "../util/EnvContext";
import { Playlists } from "./Playlists";
import { Listen } from "./Listen";
import { useMediaQuery } from "react-responsive";
import { NavbarMenu } from "./Navbar/NavbarMenu";
import { NavbarDropdown } from "./Navbar/NavbarDropdown";

const { Header, Content } = Layout;

interface DeskTopNavProps {
  children: ReactElement
}

interface PhoneNavProps {
  children: ReactElement
}

const Home = () => {
  const [isPhone, setIsPhone] = useState<boolean>();

  const user = useContext(UserContext);
  const clientURL = useContext(EnvContext);
  const location = useLocation();
  
  const DesktopNav = ({ children }: DeskTopNavProps) => {
    const isDesktop = useMediaQuery({ minWidth: 700 });
    return isDesktop ? children : null;
  };
  const PhoneNav = ({ children }: PhoneNavProps) => {
    const isPhone = useMediaQuery({ maxWidth: 699 });
    setIsPhone(isPhone);
    return isPhone ? children : null;
  };

  const logoutUser = (e: any) => {
    e.preventDefault();
    window.open(`${clientURL}/auth/logout`, "_self");
  };

  return (
    <div className="main">
      <Layout style={{height: '100vh'}}>
        <Header id="main-header" style={{ textAlign: "left", backgroundColor: '#043059' }}>
          <h1
            className="logo"
            style={{ display: "inline-block", color: "white" }}
          >
            Remixify
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
        <Content style={{backgroundColor: 'white'}}>
          <Switch>
            <Route path="/playlists">
              <Playlists user={user} isPhone={isPhone} clientURL={clientURL}/>
            </Route>
            <Route path="/listen">
              <Listen />
            </Route>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/playlists" />;
              }}
            />
          </Switch>
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
