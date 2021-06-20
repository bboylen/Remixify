
const getPlaylists = async () => {
  return fetch(`http://localhost:3001/spotify/playlists`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("failed to fetch user playlists");
    })
    .catch((error) => console.log(error))    
};

// Combined with getPlaylists

// const getRemixedPlaylists = async () => {
//   return fetch(`http://localhost:3001/spotify/remixedPlaylists`, {
//     method: "GET",
//     credentials: "include",
//   })
//     .then((response) => {
//       if (response.status === 200) return response.json();
//       throw new Error("failed to fetch user playlists");
//     })
//     .catch((error) => console.log(error));
// };

const getPlaylist = async (playlistId: string) => {
  return fetch(`http://localhost:3001/spotify/playlist`, {
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

const remixPlaylist = async (playlistId: string, playlistName: string) => {
  return fetch(`http://localhost:3001/spotify/remix`, {
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

export {getPlaylists, getPlaylist, remixPlaylist};