import React from 'react';
import { green, red, grey } from '@material-ui/core/colors';

const TableRows = (props) => {
  const { model, mainOpIndex } = props;
  const getCellDisplayValue = (val) => {
    let cellDisplayValue = '?';
    if (typeof val === 'string') {
      cellDisplayValue = val;
    }
    else if (val === true) {
      cellDisplayValue = 'T';
    }
    else if (val === false) {
      cellDisplayValue = 'F';
    }
    return cellDisplayValue;
  }

  const getCellStyle = (val, index, mainOpIndex) => {
    const isMainOpColumn = mainOpIndex === index;
    const style = {
      backgroundColor: 
        val === true  ? 
          isMainOpColumn ? green[700] : green[500] :
        val === false ? 
          isMainOpColumn ? red[700]   : red[500]   : 
        grey[500],
      minWidth: '1.5rem'
    };
    if (mainOpIndex === index) {
      style.fontWeight = 'bold'
    }
    return style;
  }
  return(
    <tbody>
      { model?.map((row, rowIndex) => 
          <tr key={rowIndex}>
            { row.map((val, cellIndex) =>  
                <td 
                  className={ mainOpIndex === cellIndex ? 'mainOp' : '' } 
                  key={cellIndex} 
                  style={ getCellStyle(val, cellIndex) }
                >
                  { getCellDisplayValue(val) }
                </td>
              )
            }
          </tr>
        )
      }
    </tbody>
  );
}

export default TableRows;