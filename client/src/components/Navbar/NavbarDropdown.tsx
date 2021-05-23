import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";

interface Props {
  location: any;
}

export const NavbarDropdown: React.FC<any> = (props) => {
  const { location } = props;

  const itemStyle: CSSProperties = {
    width: '100vw',
    height: '35px',
    textAlign: 'center',
    fontSize: '17px',
  };
  
  const menu = (
    <Menu
      id="header-nav"
      style={{
        marginTop: '17px',
        padding: '0px',
      }}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["/listen"]}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item  style={itemStyle} key="/listen">
        <Link to="/listen">Listen</Link>
      </Menu.Item>
      <Menu.Item style={itemStyle} key="/playlists">
        <Link to="/playlists">Playlists</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
        style={{
          marginLeft: "10%",
        }}
      >
        Menu
      </a>
    </Dropdown>
  );
};
