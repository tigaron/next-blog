import { ElementNode } from '@graphcms/rich-text-types';

export interface Post {
  author: Author;
  slug: string;
  createdAt: string;
  title: string;
  excerpt: string;
  featuredImage: PhotoOrFeaturedImage;
  categories?: Category[];
  content: Content;
}

export interface Author {
  bio: string;
  name: string;
  id: string;
  photo: PhotoOrFeaturedImage;
}

export interface PhotoOrFeaturedImage {
  url: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Content {
  raw: {
    children: ElementNode[];
  };
}

export interface PostDetail extends Post {
  author: Author;
  categories: Category[];
}

export interface PostCardDetail extends Omit<Post, 'content'> {
  author: Author;
  categories: Category[];
}

export interface PostNode {
  node: PostCardDetail;
}
