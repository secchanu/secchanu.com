import type { FunctionComponent } from "react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "@/styles/app/spotify/auth.module.css";

const scope =
  "user-modify-playback-state user-library-read user-read-playback-state user-read-private";

type Props = {
  setRefresh_token: Function;
  client_id: string;
};
const Component: FunctionComponent<Props> = (props) => {
  const setRefresh_token = props.setRefresh_token;
  const client_id = props.client_id;

  const router = useRouter();
  const { code } = router.query;

  const [redirect_uri, setRedirect_uri] = useState<string>();

  const login = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;

  useEffect(() => {
    const uri = `${location.protocol}//${location.host}${location.pathname}`;
    setRedirect_uri(uri);
  }, []);

  useEffect(() => {
    if (!code || !redirect_uri) return;
    (async () => {
      const res = await fetch(
        `/api/spotify/refresh_token?code=${code}&redirect_uri=${redirect_uri}`
      );
      const data = await res.json();
      router.push(redirect_uri);
      setRefresh_token(data.refresh_token);
    })();
  }, [code, redirect_uri, router, setRefresh_token]);

  return (
    <>
      {!code && redirect_uri && (
        <a className={styles.login} href={login}>
          Spotifyでログイン
        </a>
      )}
    </>
  );
};

export default Component;
