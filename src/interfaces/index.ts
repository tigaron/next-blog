export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  featuredImage: {
    url: string;
  };
  content: {
    raw: string;
  };
};

export type Category = {
  name: string;
  slug: string;
};

export type Author = {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
};

export type PostDetail = Post & {
  author: Author;
  categories: Category[];
};

export type PostCardDetail = Omit<Post, 'content'> & {
  author: Author;
  categories: Category[];
};

export type PostNode = {
  node: PostCardDetail;
};
