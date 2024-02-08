"use client";
import { useEffect, useState } from "react";
import { getToken, searchTracks } from "./api/spotify/route";

export default function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchTokyoSongs = async () => {
      try {
        const access_token = await getToken();
        const songResponse = await searchTracks(access_token, "東京");
        if (songResponse.tracks) {
          setSongs(songResponse.tracks.items);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchTokyoSongs();
  }, []);

  console.log(songs);

  return (
    <div>
      {songs.map((song, index) => (
        <div key={index}>
          <p>
            {song.name} - {song.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
