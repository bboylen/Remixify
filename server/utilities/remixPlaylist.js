const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("./spotifyWebApi");
const { Playlist, Song } = require("../models/playlist-model");

const createPlaylist = async (playlistName, userName) => {
  const newPlaylistName = `${playlistName} Remix`;
  const description = `A remix of ${playlistName}. Same artists - different songs!`;

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

const getRemixedSongs = async (oldTracks, userName) => {
  const artistIds = oldTracks.map((track) => track.track.artists[0].id);

  const spotifyApi = await setUpSpotifyApi(userName);
  const newTracks = [];

  for (let i = 0; i < artistIds.length; i++) {
    await spotifyApi.getArtistTopTracks(artistIds[i], "US").then(
      (topTracks) => {
        const tracks = topTracks.body.tracks;
        const filteredTracks = tracks;
        // const filteredTracks = tracks.filter((track) => {
        //   console.log(track.id)
        //   let isDuplicate = newTracks.some((newTrack) => newTrack.id === track.id)
        //   console.log(isDuplicate);
        //   return isDuplicate;
        //   // for (let j = 0; j < newTracks.length; j++) {
        //   //   console.log(newTracks);
        //   //   if (track.id === newTracks[j].id) return false;
        //   //   else return true;
        //   // }
        // });
        //console.log(filteredTracks);
        const selectedTrack =
          filteredTracks[Math.floor(Math.random() * filteredTracks.length)];
        newTracks.push(selectedTrack);
      },
      (err) => {
        console.log("Error grabbing tracks", err);
      }
    );
  }
  return newTracks;
};

const createRemixedPlaylist = async (newPlaylistId, remixedSongs) => {
  const newSongs = [];
  for (i = 0; i < remixedSongs.length; i++) {
    try {
    const newSong = await new Song({
      spotifyId: remixedSongs[i].id,
      name: remixedSongs[i].name,
      artist: remixedSongs[i].artists[0].name,
      album: remixedSongs[i].album.name
    }).save();
    newSongs.push(newSong);
  } catch (err) {
    console.log(err);
  }}
  return newSongs;
};

module.exports = { createPlaylist, getOldTracks, getRemixedSongs, createRemixedPlaylist };
