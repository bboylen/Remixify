import React, { useState, useEffect } from "react";
import { User } from "../util/types";

interface PlaylistProps {
  user: User;
}

export const Playlists: React.FC<PlaylistProps> = (props) => {
  const { user } = props;
  console.log(user);

  const getPlaylists = () => {
    fetch(`https://api.spotify.com/v1/users/${user.spotifyId}/playlists`, {
      method: "GET",
      credentials: 'omit',
      mode: 'cors',
      headers: {
        Authentication: 'Bearer ' + user.accessToken,
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
