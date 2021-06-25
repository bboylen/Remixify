const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("./setUpSpotifyApi");
const { Playlist, Song } = require("../models/playlist-model");

const createPlaylist = async (newPlaylistName, description, userName) => {
  const spotifyApi = await setUpSpotifyApi(userName);
  const playlistId = await spotifyApi
    .createPlaylist(newPlaylistName, {
      description: description,
      public: true,
    })
    .then(
      (data) => {
        return data.body.id;
      },
      (err) => {
        console.log("Error creating playlist", err);
      }
    );

  return playlistId;
};

const getOldTracks = async (playlistId, userName) => {
  const spotifyApi = await setUpSpotifyApi(userName);
  const trackList = await spotifyApi.getPlaylist(playlistId).then(
    (data) => {
      return data.body.tracks.items;
    },
    (err) => {
      console.log("Error grabbing playlist", err);
    }
  );

  return trackList;
};

const createRemixedSongs = async (oldTracks, userName) => {
  const artistIds = oldTracks.map((track) => track.track.artists[0].id);

  const spotifyApi = await setUpSpotifyApi(userName);
  const newTracks = [];

  for (let i = 0; i < artistIds.length; i++) {
    await spotifyApi.getArtistTopTracks(artistIds[i], "US").then(
      (topTracks) => {
        topTracks = topTracks.body.tracks;

        let selectedTrack =
          topTracks[Math.floor(Math.random() * topTracks.length)];

        //let count = 0;

        let tracksClone = [...topTracks];

        while (newTracks.some((newTrack) => {
          if (newTrack.id === selectedTrack.id) {
            return true;
          };
          return false;
        }) && (tracksClone.length > 1)) {
          tracksClone = tracksClone.filter(track => track !== selectedTrack);
          selectedTrack = tracksClone[Math.floor(Math.random() * tracksClone.length)];
        };

        newTracks.push(selectedTrack);
      },
      (err) => {
        console.log("Error grabbing tracks", err);
      }
    );
  }
  return newTracks;
};

const createRemixedPlaylist = async (
  newPlaylistId,
  newPlaylistName,
  remixedSongs,
  userId
) => {
  const newSongs = [];
  for (i = 0; i < remixedSongs.length; i++) {
    try {
      const newSong = await new Song({
        spotifyId: remixedSongs[i].id,
        name: remixedSongs[i].name,
        artist: remixedSongs[i].artists[0].name,
        album: remixedSongs[i].album.name,
      }).save();
      newSongs.push(newSong);
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const newPlaylist = await new Playlist({
      userId: userId,
      spotifyId: newPlaylistId,
      name: newPlaylistName,
      songs: newSongs,
    }).save();
    if (newPlaylist) return newPlaylist;
  } catch (err) {
    console.log(err);
  }
};

const populateRemixPlaylist = async (playlistId, remixedSongs, userName) => {
  const remixedSongIds = remixedSongs.map((song) => song.uri);

  const spotifyApi = await setUpSpotifyApi(userName);
  return await spotifyApi.addTracksToPlaylist(playlistId, remixedSongIds).then(
    () => {
      return true;
    },
    (err) => {
      console.log("Error adding songs to playlist", err);
    }
  );
};

module.exports = {
  createPlaylist,
  getOldTracks,
  createRemixedSongs,
  createRemixedPlaylist,
  populateRemixPlaylist,
};
