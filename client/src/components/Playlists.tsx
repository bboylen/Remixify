import React, { useState, useEffect, useRef } from "react";
import { User } from "../util/types";
import { Layout, Menu, Typography, Table } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import "../styles/Playlists.css";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Title } = Typography;

interface PlaylistProps {
  user: User;
}

export const Playlists: React.FC<PlaylistProps> = (props) => {
  const { user } = props;
  const [userPlaylists, setUserPlaylists] = useState<any>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>();
  const [playlistData, setPlaylistData] = useState<any>([]);

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
        console.log(responseJson);
        setUserPlaylists(responseJson.playlists.items);
      })
      .catch((error) => console.log(error));
  };

  const getPlaylist = (playlistId: string) => {
    fetch(`http://localhost:3001/spotify/playlist`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: playlistId }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to fetch user playlist");
      })
      .then((responseJson) => {
        console.log(responseJson);
        setSelectedPlaylist(responseJson.playlist);
      })
      .catch((error) => console.log(error));
  };

  const selectPlaylist = (playlist: any) => {
    getPlaylist(playlist.key);
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  useEffect(() => {
    if (selectedPlaylist) {
      console.log(selectedPlaylist);
      let data = selectedPlaylist.tracks.items.map((song: any) => {
        return {
          key: song.track.id,
          songName: song.track.name,
        };
      });
      setPlaylistData(data);
    }
  }, [selectedPlaylist]);

  const columns = [
    {
      title: "Name",
      dataIndex: "songName",
      key: "name",
    },
  ];

  return (
    <div className="Playlists" style={{ height: "100%" }}>
      <Layout style={{ height: "100%" }}>
        <Sider
          width={300}
          className="site-layout-background"
          collapsible={true}
          collapsedWidth={40}
          theme={"light"}
          style={{ height: "100%", overflow: "auto" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={(playlist) => selectPlaylist(playlist)}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Your Playlists">
              {userPlaylists.map((playlist: any) => {
                return (
                  <Menu.Item
                    key={playlist.id}
                    style={{
                      padding: "0px 5px 0px 15px",
                    }}
                  >
                    {playlist.name}
                  </Menu.Item>
                );
              })}
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<UserOutlined />}
              title="Generated Playlists"
            ></SubMenu>
          </Menu>
        </Sider>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: "100%",
            backgroundColor: "white",
          }}
        >
          {selectedPlaylist && (
            <Table dataSource={playlistData} columns={columns} sticky={true} pagination={{ pageSize: 1000, position: [] }} scroll={{ y: '80vh' }}  />
          )}
        </Content>
      </Layout>
    </div>
  );
};
