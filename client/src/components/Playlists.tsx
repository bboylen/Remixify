import React, { useState, useEffect } from "react";
import { User } from "../util/types";
import { getPlaylists, getRemixedPlaylists, getPlaylist, remixPlaylist } from "../util/spotifyRequests";
import { Layout, Menu, Table, Button } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import "../styles/Playlists.css";
import { PageHeader } from "antd";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

interface PlaylistProps {
  user: User;
}

export const Playlists: React.FC<PlaylistProps> = (props) => {
  const { user } = props;
  const [userPlaylists, setUserPlaylists] = useState<any>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>();
  const [playlistData, setPlaylistData] = useState<any>([]);
  const [remixedPlaylists, setRemixedPlaylists] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const columns = [
    {
      title: "Title",
      dataIndex: "songName",
      key: "name",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
    },
  ];

  useEffect(() => {
    getPlaylists().then((response) => {
      setUserPlaylists(response.spotifyPlaylists);
      setRemixedPlaylists(response.remixedPlaylists);
      setLoading(false);
    });
  }, []);

  //CHANGE HOW THIS WORKS, SHOULD FIRE AFTER REMIX
  useEffect(() => {
    if (userPlaylists.length > 0) {
      selectPlaylist(userPlaylists[0].id);
    }
  }, [userPlaylists]);

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
  

  // CHANGE
  const handleRemix = async () => {
    await remixPlaylist(selectedPlaylist.id, selectedPlaylist.name).then((response) => {
      setRemixedPlaylists(response.playlists);
      selectPlaylist(response.spotifyId);
    });

    getPlaylists().then((response) => {
      setUserPlaylists(response.spotifyPlaylists);
    });
  };

  const selectPlaylist = (playlistKey: any) => {
    console.log(playlistKey);
    // if key is in ${LIST_OF_REMIXED_KEYS} set ${REMIX_SELECTED} to true
    // conditional render of delete button based on ${REMIX_SELECTED}
    getPlaylist(playlistKey).then((response) => setSelectedPlaylist(response.playlist));
  };

  if (loading) return null;

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
            defaultOpenKeys={["sub1", "sub2"]}
            defaultSelectedKeys={userPlaylists[0] ? [userPlaylists[0].id] : []}
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
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: "100%",
            backgroundColor: "white",
          }}
        >
          {selectedPlaylist && (
            <PageHeader
              title={selectedPlaylist.name}
              extra={
                // Ternary based on whether playlist is remixed or not!
                true ? (
                  <Button
                    onClick={handleRemix}
                    size={"large"}
                    danger
                    type={"primary"}
                  >
                    Remix
                  </Button>
                ) : null
              }
            />
          )}
          {selectedPlaylist && (
            <Table
              dataSource={playlistData}
              columns={columns}
              sticky={true}
              pagination={{ pageSize: 1000, position: [] }}
              scroll={{ y: "65vh" }}
            />
          )}
        </Content>
      </Layout>
    </div>
  );
};
