import type { FunctionComponent } from "react";

import Card from "@/components/card";

import styles from "@/styles/showcase.module.css";

type Props = {
  head: string;
  base: string;
  items: {
    id: string;
    data: {
      [key: string]: any;
    };
  }[];
};
const Component: FunctionComponent<Props> = (props) => {
  const head = props.head;
  const base = props.base;
  const items = props.items;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.head}>{head}</h2>
      <div className={styles.items}>
        {items
          .sort((a, b) => {
            return a.data.update > b.data.update ? -1 : 1;
          })
          .map((item) => {
            return <Card key={item.id} base={base} item={item} />;
          })}
        {items.map((_, i) => (
          <div key={i} className={styles.empty} />
        ))}
      </div>
    </div>
  );
};

export default Component;
