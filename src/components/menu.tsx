import type { FunctionComponent } from "react";

import Link from "next/link";

import styles from "@/styles/menu.module.css";

const Component: FunctionComponent = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <div className={styles.item}>
          <span>●</span>
          <Link href={"/"}>トップ</Link>
        </div>
        <div className={styles.item}>
          <span>●</span>
          <Link href={"/app"}>アプリ</Link>
        </div>
        <div className={styles.item}>
          <span>●</span>
          <Link href={"/stream"}>配信</Link>
        </div>
        <div className={styles.item}>
          <span>●</span>
          <Link href={"/other"}>その他</Link>
        </div>
      </div>
    </div>
  );
};

export default Component;
