import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getRecentPosts, getSimilarPosts } from '@/services';
import Image from 'next/future/image';
import Link from 'next/link';
import { Post } from '@/interfaces';

type RelatedPostQuery = Omit<Post, 'excerpt' | 'content'>;

export default function PostWidget({
  categories,
  slug,
}: { categories: string[]; slug: string } | Record<string, never>) {
  const [widgetPosts, setWidgetPosts] = useState<RelatedPostQuery[]>([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setWidgetPosts(result),
      );
    } else {
      getRecentPosts().then((result) => setWidgetPosts(result));
    }
  }, [categories, slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? `Related Posts` : `Recent Posts`}
      </h3>
      {widgetPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              className="align-middle rounded-full"
              src={post.featuredImage.url}
              alt={post.title}
              width="64"
              height="64"
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format(`MMM DD, YYYY`)}
            </p>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
