import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Spinner from './Spinner';
import Error from './Error';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      rating
      photoFileName
    }
  }
`;

const Products = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (error) return <Error error={error} />;
  
  if (loading && !data) return <Spinner />;
  
  const { products } = data;

  return (
    <>
      <div className="row">
        <h4 className="mb-3 ml-5">Today's specials:</h4>
      </div>
      {products.map(product => (
        <div key={product.id} className="row">
          <div className="col-4 text-center ml-5">
            <img height="80" src={'/images/' + product.photoFileName} alt={product.name} />
          </div>
          <div className="col-2 my-auto">
            <Link to={'/products/' + product.id}>
              {product.name}
            </Link>
          </div>
          <div className="col-2 my-auto">${product.price}</div>
          <div className="col-2 my-auto stars">
            {Array(product.rating).fill().map(() => '*')}
          </div>
        </div>
      ))}
    </>
  );
}

export default Products;