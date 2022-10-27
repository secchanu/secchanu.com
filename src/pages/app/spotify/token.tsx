import type { GetServerSideProps, NextPage } from "next";

import { useState, useEffect } from "react";

import Auth from "@/components/spotify/auth";

import styles from "@/styles/app/spotify/token.module.css";

type Props = {
  client_id: string;
};
const Page: NextPage<Props> = (props) => {
  const client_id = props.client_id;

  const [refresh_token, setRefresh_token] = useState<string>();
  const [copied, setCopied] = useState(false);

  const copyToken = async () => {
    const tokenElem = document.getElementById("token");
    const token = tokenElem?.innerText;
    if (!token) return;
    await navigator.clipboard.writeText(token);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <div className={styles.container}>
      <div className={styles.generator}>
        {!refresh_token ? (
          <Auth setRefresh_token={setRefresh_token} client_id={client_id} />
        ) : (
          <div className={styles.board}>
            <div
              id="token"
              className={`${styles.token} ${
                copied ? styles.copied : styles.copy
              }`}
            >
              {refresh_token}
            </div>
            <button className={styles.button} onClick={copyToken}>
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  return {
    props: { client_id },
  };
};
