import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Spinner from './Spinner';
import Error from './Error';

import { GET_PRODUCT } from './queries';
import { REVIEWS_SUBSCRIPTION } from './subscriptions';

const Product = ({ match: { params: { id } } }) => {
  const { data, loading, error, subscribeToMore } = useQuery(GET_PRODUCT, {
    variables: {
      id
    }
  });

  // variables don't do anything here, because our subscription GraphQL request doesn't expect any.
  // A future enhancement would be for the server to expect an id an only push changes to this client if the product id matches.
  subscribeToMore({
    document: REVIEWS_SUBSCRIPTION,
    variables: {
      id
    },
    updateQuery: (prev, { subscriptionData }) => {
      
      console.log('updateQuery', prev, subscriptionData);

      if (!prev || !subscriptionData.data) return prev;
      const reviewAddedMessage = subscriptionData.data.reviewAdded;

      console.log('productId matches', !(reviewAddedMessage.productId !== prev.product.id));

      if (reviewAddedMessage.productId !== prev.product.id) return prev;

      console.log('already exists', prev.product.reviews.some(r => r.id === reviewAddedMessage.id));

      if (prev.product.reviews.some(r => r.id === reviewAddedMessage.id)) return prev;

      return {
        ...prev,
        product: {
          ...prev.product,
          reviews: [
            ...prev.product.reviews,
            {
              ...(({ id, title, review }) => ({ id, title, review }))(reviewAddedMessage), // neat trick to pick just the properties we want: https://stackoverflow.com/a/39333479/188740
              __typename: 'ProductReviewType'
            }
          ]
        }
      };
    }
  });

  if (error) return <Error error={error} />;

  if (loading && !data) return <Spinner />;

  const { product } = data;

  return (
    <div className="row">
      <div className="col-3">
        <img height="150" src={'/images/' + product.photoFileName} alt={product.name} />
      </div>
      <div className="col-9">
        <div className="row">
          <div className="col-12">
            <h3>{product.name}</h3>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            {product.description}}
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            In store since: {product.introducedAt}
          </div>
          <div className="col-3">
            Stock: {product.stock}
          </div>
          <div className="col-3">
            Stars: {product.rating}
          </div>
          <div className="col-3">
            Price: ${product.price}
          </div>
        </div>
        <h6>Reviews:</h6>
        <ul></ul>
        {product.reviews.map(review => (
          <div key={review.id}>
            <div className="row">
              <div className="col-12"><h5>{review.title}</h5></div>
            </div>
            <div className="row mb-2">
              <div className="col-12">{review.review}</div>
            </div>
          </div>
        ))}
        <div>
          <Link to={`/products/${id}/review`}>Add a Review</Link>
        </div>
      </div>
    </div>
  );
};

export default Product;