const getPlaylists = async (clientURL: string) => {
  return fetch(`${clientURL}/spotify/playlists`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("failed to fetch user playlists");
    })
    .catch((error) => console.log(error));
};

const getRemixedPlaylists = async (clientURL: string) => {
  return fetch(`${clientURL}/spotify/remixedPlaylists`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("failed to fetch remixed playlists");
    })
    .catch((error) => console.log(error));
};

const getPlaylist = async (playlistId: string, clientURL: string) => {
  return fetch(`${clientURL}/spotify/playlist`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playlistId: playlistId }),
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("failed to fetch user playlist");
    })
    .catch((error) => console.log(error));
};

const remixPlaylist = async (
  playlistId: string,
  playlistName: string,
  clientURL: string
) => {
  return fetch(`${clientURL}/spotify/remix`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playlistId: playlistId,
      playlistName: playlistName,
    }),
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("failed to remix user playlist");
    })
    .catch((error) => console.log(error));
};

const deletePlaylist = async (playlistId: string, clientURL: string) => {
  return fetch(`${clientURL}/spotify/deletePlaylist`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playlistId: playlistId }),
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("error in deleting user playlist");
    })
    .catch((error) => console.log(error));
};

export {
  getPlaylists,
  getRemixedPlaylists,
  getPlaylist,
  remixPlaylist,
  deletePlaylist,
};
