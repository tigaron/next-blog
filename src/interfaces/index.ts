export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  featuredImage: {
    url: string;
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

export type PostNode = {
  node: Post & {
    author: Author;
    categories: Category;
  };
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
