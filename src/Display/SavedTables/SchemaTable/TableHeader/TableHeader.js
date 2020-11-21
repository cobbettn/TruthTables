import React from 'react';
import { getStyle } from './TableHeader.style';

const TableHeader = (props) => {
  const { symbols, mainOpIndex } = props;  
  return (
    <thead>
      <tr>
        { 
          symbols.map((header, i) => 
            <th className={ i === mainOpIndex ? 'mainOp' : '' } style={ getStyle(header, i, mainOpIndex) } key={i}>
              { header.value }
            </th>
          )
        }   
      </tr>
    </thead>
  );
}

export default TableHeader;