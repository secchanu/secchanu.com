import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import type { GetStaticPaths, GetStaticProps } from "next";

import Layout from "@/components/AbeHiroshi";

import "github-markdown-css";
import styles from "@/styles/[slug].module.css";

import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const base = "/other";

type Props = {
  item: {
    id: string | string[] | undefined;
    data: {
      [key: string]: any;
    };
    content: string;
  };
};
const Page: NextPageWithLayout<Props> = (props) => {
  const item = props.item;

  return (
    <div className={styles.wrapper}>
      <article className={`${styles["markdown-body"]} markdown-body`}>
        <ReactMarkdown>{item.content}</ReactMarkdown>
      </article>
    </div>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;

type StaticProps = {};
export const getStaticProps: GetStaticProps<StaticProps> = (props) => {
  const params = props.params;
  const id = params?.slug;
  const file = readFileSync(`resource${base}/${id}.md`, "utf-8");
  const { data, content } = matter(file);
  const item = { id, data, content };
  return { props: { item } };
};

export const getStaticPaths: GetStaticPaths = () => {
  const filenames = readdirSync(`resource${base}`);
  const filtered = filenames.filter((name) => /.+.md$/.test(name));
  const paths = filtered.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
