import gql from 'graphql-tag';

export const PRODUCT_REVIEW_TYPE_FRAGMENT = gql`
  fragment review on ProductReviewType {
    id
    title
    review
  }
`;

export const PRODUCT_REVIEW_ADDED_TYPE_FRAGMENT = gql`
  fragment reviewAddedMessage on ReviewAddedMessageType {
    id
    productId
    title
    review
  }
`;