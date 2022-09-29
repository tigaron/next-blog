import { PostNode } from '@/interfaces';
import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

type PostsQuery = {
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
  const result: PostsQuery = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};
