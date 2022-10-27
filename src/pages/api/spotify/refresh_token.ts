import type { NextApiRequest, NextApiResponse } from "next";

import qs from "qs";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

type Data = {
  access_token?: string;
  token_type?: "Bearer";
  expires_in?: 3600;
  refresh_token?: string;
  scope?: string;
};
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { code, redirect_uri } = req.query;
  if (!code || !redirect_uri) {
    res.status(400).json({});
    return;
  }
  const url = "https://accounts.spotify.com/api/token";
  const grant_type = "authorization_code";
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const body = qs.stringify({
    grant_type,
    code,
    redirect_uri,
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
