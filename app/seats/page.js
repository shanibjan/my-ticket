import React from 'react';
import NavBar from '../components/NavBar';
import ShowDetails from '../components/ShowDetails';
import SeatsRow from '../components/SeatsRow';
import MovieSeats from '../components/MovieSeats';
import RateSeatSelection from '../components/RateSeatSelection';

const Seats = ({ }) => {
  return (
    <div>
      <NavBar/>
      <ShowDetails/>
      <SeatsRow/>
     
    </div>
  );
};

export default Seats;