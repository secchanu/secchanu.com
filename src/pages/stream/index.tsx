import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import type { GetStaticProps } from "next";

import Layout from "@/components/AbeHiroshi";
import Showcase from "@/components/showcase";

import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

const base = "/stream";

type Props = {
  items: {
    id: string;
    data: {
      [key: string]: any;
    };
  }[];
};
const Page: NextPageWithLayout<Props> = (props) => {
  const items = props.items;

  return <Showcase head="配信" base={base} items={items} />;
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;

export const getStaticProps: GetStaticProps = () => {
  const filenames = readdirSync(`resource${base}`);
  const filtered = filenames.filter((name) => /.+.md$/.test(name));
  const items = filtered.map((filename) => {
    const file = readFileSync(`resource${base}/${filename}`, "utf-8");
    const id = filename.replace(/.md$/, "");
    const { data, content } = matter(file);
    return { id, data };
  });
  return { props: { items } };
};
