"use client";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useRef, useState } from "react";
import { POST, GET } from "./api/spotify/route";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "./loading";
import Image from "next/image";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const AudioPlayer = ({ src }) => {
    const audioRef = useRef(null);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
      }
    }, []);
    return <audio controls src={src} ref={audioRef}></audio>;
  };

  useEffect(() => {
    const fetchTokyoSongs = async () => {
      try {
        const token_response = await fetch("/api/spotify/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const tokenData = await token_response.json();
        const access_token = tokenData.access_token;

        const songResponse = await fetch("/api/spotify", {
          method: "GET",
          headers: { Authorization: "Bearer " + access_token },
        });
        const songData = await songResponse.json();
        if (songData.tracks) {
          setSongs(songData.tracks.items);
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
      <div className="relative w-full h-screen overflow-y-scroll">
        <video
          className="absolute w-full h-full object-cover animate-fade animate-duration-[3000ms]"
          autoPlay
          muted
          loop
        >
          <source src="Tokyo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flex justify-center m-20">
        <Carousel
          plugins={[
            WheelGesturesPlugin({
              forceWheelAxis: "y",
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="slide">
            {songs.map((song, index) => (
              <div key={index} className="flex-shrink-0 m-12">
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Drawer>
                    <DrawerTrigger>
                      <Image
                        className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow"
                        src={song.album.images[0].url}
                        width={640}
                        height={640}
                        layout="responsive"
                        alt="ジャケット画像"
                        priority={false}
                      />
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader className="place-content-center">
                        <DrawerTitle className="select-all">
                          {song.name}
                        </DrawerTitle>
                        <DrawerDescription>
                          {song.artists[0].name}
                          <Image
                            className="drop-shadow-4xl mb-10"
                            src={song.album.images[1].url}
                            width={300}
                            height={300}
                            alt="中サイズジャケット画像"
                          />
                          {song.preview_url ? (
                            <AudioPlayer src={song.preview_url} />
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
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
