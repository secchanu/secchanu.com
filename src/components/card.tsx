import type { FunctionComponent } from "react";
import type { Palette } from "node-vibrant/lib/color";

import { useState } from "react";

import Link from "next/link";

import styles from "@/styles/card.module.css";

import Vibrant from "node-vibrant";

type Props = {
  base: string;
  item: {
    id: string;
    data: {
      [key: string]: any;
    };
  };
};
const Component: FunctionComponent<Props> = (props) => {
  const base = props.base;
  const item = props.item;

  const image = item.data.image;

  const [prevImage, setPrevImage] = useState<string>();
  const [palette, setPalette] = useState<Palette>();

  const getColor = (path: string | undefined) => {
    if (!path) return;
    const vibrant = Vibrant.from(path);
    vibrant.getPalette((_, p) => setPalette(p));
  };

  if (image !== prevImage) {
    getColor(image);
    setPrevImage(image);
  }

  return (
    <Link href={`${base}/${item.id}`}>
      <article
        key={item.id}
        className={styles.item}
        style={{
          backgroundColor: palette?.DarkMuted?.hex,
          color: palette?.DarkMuted?.bodyTextColor,
          boxShadow: `5px 5px 5px 0 ${palette?.DarkVibrant?.hex}`,
        }}
      >
        <img className={styles.image} src={image} alt="" />
        <h3 className={styles.title}>{item.data.title}</h3>
        <p className={styles.description}>{item.data.description}</p>
      </article>
    </Link>
  );
};

export default Component;
