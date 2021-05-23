import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

interface Props {
  location: any
}

export const NavbarMenu: React.FC<any> = (props) => {
  const { location } = props;

  return (
    <Menu
      id="header-nav"
      style={{
        display: "inline-block",
        marginLeft: "100px",
        position: "relative",
        top: "-3px",
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
  );
};
