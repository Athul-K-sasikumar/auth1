// Home.jsx
import React from 'react';


const Home = ({ userEmail }) => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Home Page</h1>
      <p>You are logged in as {userEmail}</p>
    </div>
  );
};

export default Home;
