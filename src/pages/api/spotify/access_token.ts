import type { NextApiRequest, NextApiResponse } from "next";

import qs from "qs";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

type Data = {
  access_token?: string;
  token_type?: "Bearer";
  expires_in?: 3600;
  scope?: string;
};
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { refresh_token } = req.query;
  if (!refresh_token) {
    res.status(400).json({});
    return;
  }
  const url = "https://accounts.spotify.com/api/token";
  const grant_type = "refresh_token";
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const body = qs.stringify({
    grant_type,
    refresh_token,
  });
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });
  if (response.status !== 200) {
    res.status(400).json({});
    return;
  }
  const data = await response.json();
  res.status(200).json(data);
};

export default handler;
