"use client";
import { useEffect, useState } from "react";
import { getToken, searchTracks } from "./api/spotify/route";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

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
      <video className=" h-full w-full" autoPlay muted loop>
        <source src="Tokyo.mp4" type="video/mp4" />
      </video>
      <div className="m-8 grid grid-cols-1 place-items-center">
        {songs.map((song, index) => (
          <div key={index}>
            <p>
              {/* {song.name} - {song.artists.map((artist) => artist.name).join(", ")} */}
              <img src={song.album.images[0].url} className="translate-x-6" />
              <Drawer>
                <DrawerTrigger>Check This Song</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{song.artists.name}</DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>open</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </p>
            {song.preview_url ? (
              <audio controls src={song.preview_url}></audio>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
