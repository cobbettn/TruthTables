import React from 'react';
import { getCellDisplayValue } from './lib';
import { getCellStyle } from './TableRows.style';

const TableRows = (props) => {
  const { model, mainOpIndex } = props;
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