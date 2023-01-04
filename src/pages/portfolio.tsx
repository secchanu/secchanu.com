import { GetStaticProps, NextPage } from "next";

import "github-markdown-css";
import styles from "@/styles/[slug].module.css";

import { readFileSync } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from 'rehype-external-links'

type Props = {
	item: {
		content: string;
	};
};
const Page: NextPage<Props> = (props) => {
	const item = props.item;

	return (
		<div className={styles.wrapper}>
			<article className={`${styles["markdown-body"]} markdown-body`}>
				<ReactMarkdown rehypePlugins={[rehypeRaw, () => rehypeExternalLinks({target: "_blank"})]	}>
					{item.content}
				</ReactMarkdown>
			</article>
		</div>
	);
};

export default Page;

export const getStaticProps: GetStaticProps = () => {
	const content = readFileSync("resource/portfolio.md", "utf-8");
	const item = { content };
	return { props: { item } };
};
