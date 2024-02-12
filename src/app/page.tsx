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
import Link from "next/link";
import Loading from "./loading";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    setTimeout(fetchTokyoSongs, 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <video
        className="h-full w-full animate-fade animate-duration-[3000ms]"
        autoPlay
        muted
        loop
      >
        <source src="Tokyo.mp4" type="video/mp4" />
        <p>haikei</p>
      </video>
      <div className="my-12 grid grid-cols-1 place-items-center">
        {songs.map((song, index) => (
          <div key={index}>
            <div className="flex justify-center m-6">
              <Drawer>
                <DrawerTrigger>
                  <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-4xl">
                    <img src={song.album.images[0].url} />
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="place-content-center">
                    <DrawerTitle>{song.name}</DrawerTitle>
                    <DrawerDescription>
                      {song.artists[0].name}
                      <img
                        src={song.album.images[1].url}
                        className="drop-shadow-4xl mb-10"
                      />
                      {song.preview_url ? (
                        <audio controls src={song.preview_url}></audio>
                      ) : (
                        <div />
                      )}
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>
                      <Link href={song.external_urls.spotify}>
                        Open in Spotify
                      </Link>
                    </Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
