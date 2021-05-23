import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";

interface Props {
  location: any
}

export const NavbarDropdown: React.FC<any> = (props) => {
  const { location } = props;

  const menu = (
<Menu
      id="header-nav"
      style={{
        
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
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{
      marginLeft: '10%',

    }}>
      Menu
    </a>
  </Dropdown>
  );
};
