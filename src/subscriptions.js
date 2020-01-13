import gql from 'graphql-tag';

import { PRODUCT_REVIEW_ADDED_TYPE_FRAGMENT } from './fragments';

export const REVIEWS_SUBSCRIPTION = gql`
  subscription {
    reviewAdded {
      ...reviewAddedMessage
    }
  }
  ${PRODUCT_REVIEW_ADDED_TYPE_FRAGMENT}
`;