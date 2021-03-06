import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Error from './Error';

import { GET_PRODUCT } from './queries';
import { PRODUCT_REVIEW_TYPE_FRAGMENT } from './fragments';

const ADD_REVIEW = gql`
  mutation($review: ReviewInput!) {
    createReview(review: $review) {
      ...review
    }
  }
  ${PRODUCT_REVIEW_TYPE_FRAGMENT}
`;

const updateReviews = (
  client,
  {
    data: {
      createReview: review
    }
  },
  productId
) => {
  const data = client.readQuery({
    query: GET_PRODUCT,
    variables: {
      id: productId
    }
  });

  // Prevent double insertion if a subscription event already added this review
  if (data.product.reviews.some(r => r.id === review.id))
    return;

  client.writeQuery({
    query: GET_PRODUCT,
    variables: {
      id: productId
    },
    data: {
      ...data,
      product: {
        ...data.product,
        reviews: [
          ...data.product.reviews,
          review
        ]
      }
    }
  });
};

const ReviewAdd = ({ match: { params: { id: productId } } }) => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    variables: {
      review: {
        title: title,
        review: review,
        productId
      }
    },
    optimisticResponse: {
      createReview: {
        __typename: "ProductReviewType",
        id: new Date().getTime() + '',
        title,
        review
      }
    },
    update: (client, data) => updateReviews(client, data, productId)
  });

  const onTitleChange = e => setTitle(e.target.value);
  const onReviewChange = e => setReview(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    setTitle('');
    setReview('');
    addReview();
  };

  return (
    <div className="mb-5">
      {error && <Error error={error} />}
      <h4>Add a review</h4>
      <form onSubmit={onSubmit}>
        <div className="row mb-2 form-group">
          <div className="col-3">
            <label htmlFor="title"></label>
          </div>
          <div className="col-9">
            <input id="title" className="form-control" type="text" value={title} onChange={onTitleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="review"></label>
          </div>
          <div className="col-9">
            <textarea id="review" className="form-control" type="text" value={review} onChange={onReviewChange} rows="5" required></textarea>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-3">
          </div>
          <div className="col-9">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewAdd;