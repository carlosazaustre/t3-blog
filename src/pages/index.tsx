import type { NextPage } from "next";
import Head from "next/head";
import { getMetadataFromAllFiles } from '@/services/mdx';
import { orderByDate } from '@/helpers/order-by-date';

import { PostListItem } from '@/components/PostListItem';

export async function getStaticProps() {
  const allPosts = await getMetadataFromAllFiles('posts');
  const posts = allPosts.sort((a, b) => orderByDate(a.date, b.date)).slice(0, 3);

  return { props: {posts} }
}

type Post = {
  title: string;
  date: string;
  slug: string;
  summary: string;
  readingTime: string;
}

const Home = ({posts} : {posts : Post[]}) => {
  return (
    <>
      <Head>
        <title>MyBlog</title>
        <meta name="description" content="Programación Web y JavaScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-96 mx-auto flex flex-col items-center">
        {posts.map((post: Post) => <PostListItem key={post.slug} {...post}/> )}
      </div>
    </>
  );
}

export default Home;
