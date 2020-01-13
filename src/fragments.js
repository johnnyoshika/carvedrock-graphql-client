import gql from 'graphql-tag';

export const PRODUCT_REVIEW_TYPE_FRAGMENT = gql`
  fragment review on ProductReviewType {
    id
    title
    review
  }
`;