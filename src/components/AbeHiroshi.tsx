import type { ReactNode } from "react";

import Menu from "./menu";

import styles from "@/styles/Layout.module.css";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        <Menu />
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
