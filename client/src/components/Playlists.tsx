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

  const getPlaylist = (playlistId: string) => {
    fetch(`http://localhost:3001/spotify/playlist`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: playlistId}),
    }).then((response) => {
      if (response.status === 200) return response.json();
      throw new Error('failed to fetch user playlist');
    }).then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    }).catch((error) => console.log(error))
  }

  const selectPlaylist = (playlist: any) => {
    let playlistInfo = getPlaylist(playlist.key);
    setSelectedPlaylist(playlistInfo);
  };

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
          onClick={(playlist) => selectPlaylist(playlist)}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Your Playlists">
            {userPlaylists.map((playlist: any) => {
              return <Menu.Item  key={playlist.id}>{playlist.name}</Menu.Item> 
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
