import React from 'react';
import Time from '../utils/time';
import SwimIcon from './atoms/SwimIcon';
import BikeIcon from './atoms/BikeIcon';
import RunIcon from './atoms/RunIcon';
import Ranks from './atoms/Ranks';
import ActivityResult from './atoms/ActivityResult';

const DetailsResult = ({ result, totals }) => (
  <div className="container">
    <div className="activitiesLine">
      <Ranks ranks={result.ranks} cat={result.cat} gender={result.sex} totals={totals} />
      <ActivityResult
        icon={<SwimIcon />}
        label="Natation"
        time={Time.convert(result.swim)}
        speed={Time.swim(result.swim)}
        unit="/100m"
      />
      <ActivityResult
        icon={<BikeIcon />}
        label="Vélo"
        time={Time.convert(result.bike)}
        speed={Time.bike(result.bike)}
        unit="km/h"
      />
      <ActivityResult
        icon={<RunIcon />}
        label="Course à pied"
        time={Time.convert(result.run)}
        speed={Time.run(result.run)}
        unit="/km"
      />
    </div>
    <style jsx>
      {`
        .container {
          padding: 0.5rem;
        }
        .activitiesLine {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }
      `}
    </style>
  </div>
);

export default DetailsResult;
