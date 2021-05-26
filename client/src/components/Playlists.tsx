import React, { useState, useEffect } from "react";
import { User } from "../util/types";
import { Layout, Menu, Button } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

interface PlaylistProps {
  user: User;
}

export const Playlists: React.FC<PlaylistProps> = (props) => {
  const { user } = props;
  const [ userPlaylists, setUserPlaylists ] = useState<any>([]);
  const [ selectedPlaylist, setSelectedPlaylist ] = useState<any>();

  const getPlaylists = () => {
    fetch(`http://localhost:3001/spotify/playlists`, {
      method: "GET",
      credentials: "include",
      headers: {},
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to fetch user playlists");
      })
      .then((responseJson) => {
        console.log(responseJson)
        setUserPlaylists(responseJson.playlists.items);
      })
      .catch((error) => console.log(error));
  };

  const selectPlaylist = (e: any) => {
    console.log(e.target);
  }
  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className="Playlists" style={{height: '100%'}}>
      <Layout style={{height: '100%'}}>
      <Sider width={200} className="site-layout-background" style={{height: '100%'}}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Your Playlists">
            {userPlaylists.map((playlist: any) => {
              return <Menu.Item onClick={selectPlaylist} key={playlist.id}>{playlist.name}</Menu.Item> 
            })}
          </SubMenu>
        </Menu>
      </Sider>
      <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </div>
  );
};
