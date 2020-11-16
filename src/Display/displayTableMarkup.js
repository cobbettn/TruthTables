import React from 'react';
import { green, red, grey } from '@material-ui/core/colors';
import { Box, Card, Typography, Tooltip, Switch } from '@material-ui/core';
import theme from '../theme'

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
      <th className={i === mainOpIndex && 'mainOp'} style={ getStyle(header, i) } key={i}>{header.value}</th>
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
            <td className={mainOpIndex === cellIndex && 'mainOp'} key={cellIndex} style={ getCellStyle(val, cellIndex) }>
              { getCellDisplayValue(val) }
            </td>
          )
        )}
      </tr>
    )
  );
};

const getCardTable = (config) => {
  const { style, headers, table, clickHandlers, showButtons: isSavedTable, collapsed, schemaType } = config;
  const buttonStyle = {
    backgroundColor: grey[600],
    border: `1px solid ${grey[900]}`,
    width: '1.5rem',
    height: '1.5rem',
    lineHeight: '1.5rem',
    display: 'flex',
    justifyContent: 'center', 
    alignContent: 'center',  
    margin: '0.1rem',
    borderRadius: '3px', 
    cursor: 'pointer',
    boxShadow: `1px 1px 1px ${grey[800]}`
  };
  const buttons = (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Tooltip arrow placement='top' title={`${ collapsed ? 'expand' : 'collapse' }`}>
        <Box style={buttonStyle} onClick={clickHandlers?.onCollapse}>
          <Typography variant="button">{collapsed ? '\u2BC6' : '\u2BC5'}</Typography>
        </Box>
      </Tooltip>
      <Tooltip arrow placement='top' title='previous operation'>
        <Box style={buttonStyle} onClick={clickHandlers?.onPrev}>
          <Typography variant="button">{'\u21E6'}</Typography>
        </Box>
      </Tooltip>
      <Tooltip arrow placement='top'title='next operation'>
        <Box style={buttonStyle} onClick={clickHandlers?.onNext}>
          <Typography variant="button">{'\u21E8'}</Typography>
        </Box>
      </Tooltip>
      <Tooltip arrow placement='top' title='edit'>
        <Box style={buttonStyle} onClick={clickHandlers?.onEdit}>
          <Typography variant="button">{'\u270E'}</Typography>
        </Box>
      </Tooltip>
      <Tooltip arrow placement='top' title='delete'>
        <Box style={buttonStyle} onClick={clickHandlers?.onDelete}>
          <Typography variant="button">{'\u232B'}</Typography>
        </Box>
      </Tooltip>
    </Box>
  );
  const editorTitleStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    margin: '0.1rem',
    padding: '0.1rem',
    borderRadius: '2px'
  }
  const editorTitle = (
    <Box style={editorTitleStyle}>
      <Typography style={{paddingLeft: '0.25rem'}} variant='button'>{schemaType === 'P' ? 'Premise' : 'Conclusion'}</Typography>
      <Switch
        size='small'
        checked={schemaType === 'P'}
        onChange={clickHandlers?.onSwitch}
      />
    </Box>
  );
  const tableStyle = {
    display:'flex', 
    justifyContent:'center', 
    backgroundColor: isSavedTable ? theme.palette.grey['600'] : theme.palette.primary.main,
    margin: '0.2rem',
    padding: '0.2rem',
    borderRadius: '3px'
  }
  return (
    <Card raised className="Card" style={style}>
      { isSavedTable ? buttons : editorTitle }
      <div style={tableStyle}>
        <table>
          <thead>
            <tr>{ headers }</tr>
          </thead>
          <tbody>{ !collapsed && table }</tbody>
        </table>
      </div>
    </Card>
  );
};

export { getHeaders, getRows, getCardTable }