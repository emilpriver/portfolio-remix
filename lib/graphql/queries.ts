import { gql } from "graphql-request";

export const getPosts = gql`
  query GetAllPosts {
    posts(orderBy: date_DESC) {
      title
      slug
      date
      createdAt
      content {
        json
        text
        html
        markdown
        references {
          ... on Asset {
            id
            url
            mimeType
          }
        }
      }
    }
  }
`;

export const getPost = gql`
  query GetSinglePost($slug: String) {
    post(where: { slug: $slug }) {
      title
      tags
      slug
      seo(locales: en) {
        createdAt
        description
        image {
          url(
            transformation: {
              document: { output: { format: jpg } }
              image: { resize: { fit: crop, width: 1200, height: 630 } }
            }
          )
        }
        title
      }
      excerpt
      date
      createdAt
      coverImage {
        url(transformation: { document: { output: { format: webp } } })
      }
      content {
        html
        json
        text
        references {
          ... on Asset {
            id
            url
            mimeType
          }
        }
      }
      author {
        name
        picture {
          url(transformation: { document: { output: { format: webp } } })
        }
      }
    }
  }
`