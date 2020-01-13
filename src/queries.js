import gql from 'graphql-tag';

import { PRODUCT_REVIEW_TYPE_FRAGMENT } from './fragments';

export const GET_PRODUCT = gql`
  query ($id: ID!) {
    product(id: $id) {
      id
      name
      price
      rating
      photoFileName
      description
      stock
      introducedAt
      reviews {
        ...review
      }
    }
  }
  ${PRODUCT_REVIEW_TYPE_FRAGMENT}
`;