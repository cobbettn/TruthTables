import React from 'react';
import { getLegendTable } from '../displayTableLogic';

const LegendTable = (props) => {
  const { sentenceLetters } = props; 
  const legendTable = getLegendTable(sentenceLetters);
  return (
    <div className="LegendTable">
      { legendTable }
    </div>
  );
}

export default LegendTable;
