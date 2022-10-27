import type { GetServerSideProps, NextPage } from "next";

import { useState } from "react";

import Auth from "@/components/spotify/auth";
import Wallpaper from "@/components/spotify/wallpaper/";

import styles from "@/styles/app/spotify/token.module.css";

type Props = {
  client_id: string;
};
const Page: NextPage<Props> = (props) => {
  const client_id = props.client_id;

  const [refresh_token, setRefresh_token] = useState<string>();

  if (refresh_token) {
    return <Wallpaper refresh_token={refresh_token} />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.generator}>
          <Auth setRefresh_token={setRefresh_token} client_id={client_id} />
        </div>
      </div>
    );
  }
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  return {
    props: { client_id },
  };
};
