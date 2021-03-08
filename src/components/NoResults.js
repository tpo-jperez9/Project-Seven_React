import React from 'react';

// component to let the user know no results were returned by flikr//
const NoResults = () => {
  return (
    <li className="not-found">
      <h3>No Results Found</h3>
      <p>You search did not return any results. Please try again.</p>
    </li>
  );
};

export default NoResults;