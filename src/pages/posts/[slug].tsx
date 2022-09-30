import Author from '@/components/Author';
import Categories from '@/components/Categories';
import CommentsForm from '@/components/CommentsForm';
import PostContent from '@/components/PostContent';
import PostWidget from '@/components/PostWidget';
import { PostDetail } from '@/interfaces';
import { getPostDetails, getPosts } from '@/services';
import React from 'react';

export default function PostDetails({ post }: { post: PostDetail }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostContent post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} title={post.title} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = (await getPostDetails(params.slug)) || [];
  return {
    props: { post },
  };
}
