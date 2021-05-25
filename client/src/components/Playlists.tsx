import React, { useState, useEffect } from "react";
import { User } from "../util/types";

interface PlaylistProps {
  user: User;
}

export const Playlists: React.FC<PlaylistProps> = (props) => {
  const { user } = props;

  const getPlaylists = () => {
    fetch(`http://localhost:3001/spotify/playlists`, {
      method: "GET",
      credentials: 'include',
      headers: {
        
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to fetch user playlists");
      })
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return <div className="Playlists">Playlists</div>;
};
