import React from "react";
import { Table, Button, PageHeader } from "antd";

interface PlaylistProps {
  // Switch type
  selectedPlaylist: any;
  remixedSelected: Boolean;
  handleDelete: any;
  handleRemix: any;
  playlistData: any;
}

export const Playlist: React.FC<PlaylistProps> = (props) => {
  const {
    selectedPlaylist,
    remixedSelected,
    handleDelete,
    handleRemix,
    playlistData,
  } = props;

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

  return (
    <div className="playlist-container">
      {selectedPlaylist && (
        <PageHeader
          title={selectedPlaylist.name}
          extra={
            remixedSelected ? (
              [
                <Button
                  onClick={handleDelete}
                  size={"large"}
                  danger
                  type={"primary"}
                >
                  Delete
                </Button>,
                <Button onClick={handleRemix} size={"large"} type={"primary"}>
                  Remix
                </Button>,
              ]
            ) : (
              <Button onClick={handleRemix} size={"large"} type={"primary"}>
                Remix
              </Button>
            )
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
    </div>
  );
};
