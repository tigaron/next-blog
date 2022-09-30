import { Category, Post, PostDetail, PostNode } from '@/interfaces';
import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

type AllPostsQuery = {
  postsConnection: {
    edges: PostNode[];
  };
};

type RelatedPostQuery = Omit<Post, 'excerpt' | 'content' | 'featuredImage'>;

export async function getPosts() {
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
}

export async function getPostDetails(slug: string) {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `;
  const { post }: { post: PostDetail } = await request(graphqlAPI, query, {
    slug,
  });
  return post;
}

export async function getRecentPosts() {
  const query = gql`
  query GetRecentPosts() {
    posts(
      orderBy: createdAt_ASC
      last: 3
    ) {
      title
      createdAt
      slug
    }
  }
  `;
  const { posts }: { posts: RelatedPostQuery[] } = await request(
    graphqlAPI,
    query,
  );
  return posts;
}

export async function getSimilarPosts(categories: string[], slug: string) {
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
        createdAt
        slug
      }
    }
  `;
  const { posts }: { posts: RelatedPostQuery[] } = await request(
    graphqlAPI,
    query,
    { categories, slug },
  );
  return posts;
}

export async function getCategories() {
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
}
