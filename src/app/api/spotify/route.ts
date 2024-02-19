import { log } from "console";
import { NextRequest } from "next/server";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export const POST = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });
  const data = await response.json();
  return Response.json({ access_token: data.access_token });
};

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  const access_token = authHeader?.split(" ")[1];
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      "東京"
    )}&type=track&limit=50`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  );
  const data = await response.json();
  return Response.json(data);
};
