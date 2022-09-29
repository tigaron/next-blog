import Categories from '@/components/Categories';
import PostCard from '@/components/PostCard';
import PostWidget from '@/components/PostWidget';
import { PostNode } from '@/interfaces';
import { getPosts } from '@/services';
import Head from 'next/head';

type Props = {
  posts: PostNode[];
};

export default function Home({ posts }: Props) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Four Leaves Studio</title>
        <meta name="description" content="My personal blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map(({ node: post }) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
