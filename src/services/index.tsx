import { Category, Post, PostNode } from '@/interfaces';
import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

type AllPostsQuery = {
  postsConnection: {
    edges: PostNode[];
  };
};

export const getPosts = async () => {
  const query = gql`
    query Posts {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            slug
            createdAt
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result: AllPostsQuery = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
  query GetRecentPosts() {
    posts(
      orderBy: createdAt_ASC
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `;
  const { posts }: { posts: Post[] } = await request(graphqlAPI, query);
  return posts;
};

export const getSimilarPosts = async () => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const { posts }: { posts: Post[] } = await request(graphqlAPI, query);
  return posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const { categories }: { categories: Category[] } = await request(
    graphqlAPI,
    query,
  );
  return categories;
};
