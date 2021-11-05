import React from 'react';
import theme from '../../../theme';

const TableHeader = (props) => {
  const { symbols, mainOpIndex } = props;  
  const getStyle = (header, index, mainOpIndex) => {
    const style = {
      backgroundColor: header.bgColor || theme.palette.grey[700],
    }
    if (mainOpIndex === index) style.fontWeight = 'bold'
    return style;
  };
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