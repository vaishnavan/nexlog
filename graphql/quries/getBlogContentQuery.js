import { gql } from '@apollo/client'

export const getBlogContentQuery = gql`
query {
    blogPostCollection {
      items {
        blogpostId
        blogTitle
        blogImageUrl
        blogContent {
          json
        }
        blogPostedAt
      }
    }
  }
`

export const getBlogSlugQuery = gql`
query {
    blogPostCollection {
      items {
        blogTitle
      }
    }
  }
`
