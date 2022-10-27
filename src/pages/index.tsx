import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";

import Image from "next/image";
import Layout from "@/components/AbeHiroshi";

import styles from "@/styles/index.module.css";

const Page: NextPageWithLayout = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>secchanuのホームページ</h1>
      <div className={styles.flex}>
        <div className={styles.profile}>
          <Image
            src="https://github.com/secchanu.png"
            alt="icon"
            width={350}
            height={350}
          />
          <div className={styles.info}>
            <div className={styles.name}>secchanu</div>
            <div className={styles.birth}>生年月日 1999年9月29日</div>
            <div className={styles.blood}>血液型 O型</div>
          </div>
        </div>
        <div className={styles.news}>
          <div className={styles.stars}>★★★　オススメ　★★★</div>
          <div className={styles.items}>
            {<div className={styles.item}></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;
