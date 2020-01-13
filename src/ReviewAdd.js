import React, { useState } from 'react';

const ReviewAdd = () => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const onTitleChange = e => setTitle(e.target.value);
  const onReviewChange = e => setReview(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="mb-5">
      <h4>Add a review</h4>
      <form onSubmit={onSubmit}>
        <div className="row mb-2 form-group">
          <div className="col-3">
            <label htmlFor="title"></label>
          </div>
          <div className="col-9">
            <input id="title" className="form-control" type="text" value={title} onChange={onTitleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="review"></label>
          </div>
          <div className="col-9">
            <textarea id="review" className="form-control" type="text" value={review} onChange={onReviewChange} rows="5"></textarea>
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