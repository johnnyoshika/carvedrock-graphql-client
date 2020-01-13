import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Spinner from './Spinner';
import Error from './Error';

import { GET_PRODUCT } from './queries';

const Product = ({ match: { params: { id } } }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id
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