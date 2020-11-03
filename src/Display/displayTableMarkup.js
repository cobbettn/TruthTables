import React from 'react';
import { green, red, grey } from '@material-ui/core/colors';
import { Box, Card, Typography } from '@material-ui/core';
const getHeaders = (headers, mainOpIndex) => {
  const getStyle = (header, index) => {
    const style = {
      backgroundColor: header.bgColor || grey['700'],
    }
    if (mainOpIndex === index) style.fontWeight = 'bold'
    return style;
  };
  return headers.map((header, i) => 
    (
      <th className={i === mainOpIndex ? 'mainOp' : ''} style={ getStyle(header, i) } key={i}>{header.value}</th>
    )
  );
};

const getRows = (rows, mainOpIndex) => {
  const getCellStyle = (val, index) => {
    const isMainOpColumn = mainOpIndex === index;
    const style = {
      backgroundColor: 
        val === true  ? 
          isMainOpColumn ? green['700'] : green['500'] :
        val === false ? 
          isMainOpColumn ? red['700']   : red['500']   : 
        grey['500']
    };
    if (mainOpIndex === index) {
      style.fontWeight = 'bold'
    }
    return style;
  }
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
  return rows.map((row, rowIndex) => 
    (
      <tr key={rowIndex}>
        {row.map((val, cellIndex) =>  
          (
            <td className={mainOpIndex === cellIndex ? 'mainOp' : ''} key={cellIndex} style={ getCellStyle(val, cellIndex) }>
              { getCellDisplayValue(val) }
            </td>
          )
        )}
      </tr>
    )
  );
};

const getCardTable = (config) => {
  const { style, headers, table, clickHandlers, showButtons } = config;
  const buttonStyle = {
    backgroundColor: grey[600],
    border: `1px solid ${grey[900]}`,
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'center',   
    margin: '0.1rem',
    borderRadius: '3px', 
    cursor: 'pointer',
    boxShadow: `1px 1px 1px ${grey[800]}`
  }
  const buttons = (
    <Box style={{display: 'flex', justifyContent: 'flex-end'}}>
      
      <Box style={buttonStyle} onClick={clickHandlers && clickHandlers.onPrev}>
        <Typography>{'\u23EA'}</Typography>
      </Box>
      <Box style={buttonStyle} onClick={clickHandlers && clickHandlers.onNext}>
        <Typography>{'\u23E9'}</Typography>
      </Box>
      
      <Box style={buttonStyle} onClick={clickHandlers && clickHandlers.onEdit}>
        <Typography>{'\u270E'}</Typography>
      </Box>
      <Box style={buttonStyle} onClick={clickHandlers && clickHandlers.onDelete}>
        <Typography>{'\u{1F5D1}'}</Typography>
      </Box>
    </Box>
  );
  return (
    <Card raised className="Card" style={style}>
      { showButtons &&  buttons }
      <table>
        <thead>
          <tr>{ headers }</tr>
        </thead>
        <tbody>{ table }</tbody>
      </table>
    </Card>
  );
};

export { getHeaders, getRows, getCardTable }