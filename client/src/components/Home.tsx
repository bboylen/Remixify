import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { UserContext } from "../util/UserContext";

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  // user interface
  const user = useContext(UserContext);

  const logoutUser = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3001/auth/logout", "_self");
  };
  return (
    <Layout className="main">
      <Header>
        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Listen</Menu.Item>
          <Menu.Item key="2">Playlists</Menu.Item>
        </Menu>
        <Button onClick={logoutUser}>Logout</Button>
      </Header>
      <Content>
        I cant think of anything to say
      </Content>
    </Layout>
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
