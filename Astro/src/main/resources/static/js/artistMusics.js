import localSongs from "./local-tracks/localSongs.mjs";

const artistName = document.getElementById("artist-name");

if (localSongs.some((song) => song.artist == artistName.toSring())) {
  console.log("This artist is in the local songs list");
} else {
  console.log("This artist is not in the local songs list");
}
