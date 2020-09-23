import React from 'react';
import { getSavedTables } from '../displayTableLogic';

const SavedTables = (props) => {
  return (
    <div style={{display: 'flex'}}>
      { getSavedTables(props) }  
    </div>
  );
}

export default SavedTables;