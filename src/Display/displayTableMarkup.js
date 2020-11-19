import React from 'react';
import { green, red, grey } from '@material-ui/core/colors';
import { Box, Card, Typography, Tooltip, Switch } from '@material-ui/core';
import theme from '../theme';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FastRewindTwoToneIcon from '@material-ui/icons/FastRewindTwoTone';
import FastForwardTwoToneIcon from '@material-ui/icons/FastForwardTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

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
  const { style, headers, table, clickHandlers, showButtons: isSavedTable, collapsed, schemaType } = config;
  const buttonStyle = {
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
    boxShadow: `1px 1px 1px ${grey[800]}`,
  };
  const buttons = (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Tooltip className='tableButton' arrow placement='top' title={ collapsed ? 'expand' : 'collapse' }>
        <Box style={buttonStyle} onClick={clickHandlers?.onCollapse}>
          { collapsed ? <ExpandMoreIcon fontSize='small'/>: <ExpandLessIcon fontSize='small'/> }
        </Box>
      </Tooltip>
      <Tooltip className='tableButton' arrow placement='top' title='previous operation'>
        <Box style={buttonStyle} onClick={clickHandlers?.onPrev}>
          <FastRewindTwoToneIcon fontSize='small'/>
        </Box>
      </Tooltip>
      <Tooltip className='tableButton'arrow placement='top'title='next operation'>
        <Box style={buttonStyle} onClick={clickHandlers?.onNext}>
          <FastForwardTwoToneIcon fontSize='small'/>
        </Box>
      </Tooltip>
      <Tooltip className='tableButton' arrow placement='top' title='edit'>
        <Box style={buttonStyle} onClick={clickHandlers?.onEdit}>
          <EditTwoToneIcon fontSize='small'/>
        </Box>
      </Tooltip>
      <Tooltip className='tableButton' arrow placement='top' title='delete'>
        <Box style={buttonStyle} onClick={clickHandlers?.onDelete}>
          <DeleteTwoToneIcon fontSize='small'/>
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
      <Typography 
        style={{paddingLeft: '0.25rem', lineHeight: '1.5rem'}} 
        variant='caption'
      >{
        schemaType === 'P' ? 'Premise' : 'Conclusion'
      }</Typography>
      <Tooltip 
        title='save as a premise or conclusion'
        placement='top'
        arrow={true}
      >
        <Switch
          size='small'
          checked={schemaType === 'C'}
          onChange={clickHandlers?.onSwitch}
        />
      </Tooltip>
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