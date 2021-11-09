import React, { useState, useEffect } from "react";
import { User } from "../util/types";
import { Playlist } from "./Playlist";
import {
  getPlaylists,
  getRemixedPlaylists,
  getPlaylist,
  remixPlaylist,
  deletePlaylist,
} from "../util/spotifyRequests";
import { Layout, Menu, Spin } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import "../styles/Playlists.css";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

interface PlaylistsProps {
  user: User;
  isPhone: boolean | undefined;
  clientURL: string;
}

export const Playlists = (props: PlaylistsProps) => {
  const { isPhone, clientURL } = props;
  const [userPlaylists, setUserPlaylists] = useState<any>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<any>([]);
  const [playlistData, setPlaylistData] = useState<any>([]);
  const [remixedPlaylists, setRemixedPlaylists] = useState<any>([]);
  const [remixedSelected, setRemixedSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  useEffect(() => {
    getPlaylists(clientURL)
      .then((response) => {
        setUserPlaylists(response.spotifyPlaylists);
        setRemixedPlaylists(response.remixedPlaylists);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (userPlaylists.length > 0) {
      selectPlaylist(userPlaylists[0].id);
    }
  }, [userPlaylists]);

  useEffect(() => {
    if (isPhone) {
      setSidebarCollapsed(true);
    }
  }, [isPhone]);

  useEffect(() => {
    if (selectedPlaylist) {
      let data = selectedPlaylist.tracks.items.map((song: any) => {
        return {
          key: song.track.id,
          songName: song.track.name,
          artist: song.track.artists[0].name,
          album: song.track.album.name,
        };
      });
      setPlaylistData(data);
    }
  }, [selectedPlaylist]);

  const handleRemix = async () => {
    setContentLoading(true);

    let response;

    try {
      response = await remixPlaylist(
        selectedPlaylist.id,
        selectedPlaylist.name,
        clientURL
      );
      setRemixedPlaylists(response.playlists);
      selectPlaylist(response.playlistId, true);
      setContentLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    await deletePlaylist(selectedPlaylist.id, clientURL);

    getRemixedPlaylists(clientURL)
      .then((response) => {
        setRemixedPlaylists(response.playlists);
        setSelectedPlaylist(null);
        setSelectedPlaylistId(null);
      })
      .catch((error) => console.log(error));
  };

  const handleSidebarCollapse = () => {
    if (isPhone) return;

    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    } else {
      setSidebarCollapsed(true);
    }
  };

  const selectPlaylist = (playlistKey: any, remixed: Boolean = false) => {
    setSelectedPlaylistId(playlistKey);

    if (!remixed) {
      remixed = remixedPlaylists.some(
        (playlist: any) => playlist.spotifyId === playlistKey
      );
    }

    if (remixed) {
      setRemixedSelected(true);
    } else {
      setRemixedSelected(false);
    }

    getPlaylist(playlistKey, clientURL).then((response) =>
      setSelectedPlaylist(response.playlist)
    );
  };

  if (loading) return null;

  return (
    <div className="Playlists" style={{ height: "100%" }}>
      <Layout style={{ height: "100%" }}>
        <Sider
          width='300'
          collapsible={true}
          collapsedWidth='40'
          collapsed={sidebarCollapsed}
          onCollapse={handleSidebarCollapse}
          theme='light'
          style={{ height: "100%", overflow: "auto" }}
        >
          <Menu
            mode="inline"
            defaultOpenKeys={isPhone ? ["", ""] : ["sub1", "sub2"]}
            defaultSelectedKeys={userPlaylists[0] ? [userPlaylists[0].id] : []}
            selectedKeys={selectedPlaylist ? selectedPlaylistId : []}
            style={{ height: "100%", borderRight: 0 }}
            onClick={(playlist) => selectPlaylist(playlist.key)}
          >
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title="Your Playlists"
              style={{
                maxHeight: "60%",
                overflow: "auto",
                overflowX: "hidden",
              }}
            >
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
              icon={<LaptopOutlined />}
              title="Generated Playlists"
            >
              {remixedPlaylists.map((playlist: any) => {
                return (
                  <Menu.Item
                    key={playlist.spotifyId}
                    style={{
                      padding: "0px 5px 0px 15px",
                    }}
                  >
                    {playlist.name}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Content
          className="site-layout-background"
          style={{
            padding: 16,
            paddingLeft: 5,
            paddingTop: 0,
            margin: 0,
            minHeight: 280,
            height: "100%",
            backgroundColor: "white",
          }}
        >
          {contentLoading ? (
            <Spin size="large" style={{ marginTop: "10rem" }} />
          ) : (
            <Playlist
              selectedPlaylist={selectedPlaylist}
              remixedSelected={remixedSelected}
              handleDelete={handleDelete}
              handleRemix={handleRemix}
              playlistData={playlistData}
              isPhone={isPhone}
            />
          )}
        </Content>
      </Layout>
    </div>
  );
};
