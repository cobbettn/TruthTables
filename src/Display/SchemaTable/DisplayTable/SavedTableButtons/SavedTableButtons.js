import React from 'react';
import { Box,  Tooltip } from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FastRewindTwoToneIcon from '@material-ui/icons/FastRewindTwoTone';
import FastForwardTwoToneIcon from '@material-ui/icons/FastForwardTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import theme from '../../../../theme';
import { makeStyles } from '@material-ui/core/styles';

const SavedTableButtons = (props) => {
  const { clickHandlers, schema } = props;
  const{ collapsed, tableInfo } = schema;
  const { valid, invalid, satisfiable, unsatisfiable } = tableInfo;
  const light = green[500];
  const dark = grey[800];
  const infoStyle =  {
    width: '0.5rem', 
    height: '0.5rem', 
    borderRadius:'50%', // circular box
    margin: '0.5rem 0.2rem',
    justifyContent: 'center'
  }
  const getTooltipStyles = makeStyles(theme => (
    {
      arrow: {
        color: `${theme.palette.grey[900]}`,
        opacity: '1'
      },
      tooltip: {
        backgroundColor: `${theme.palette.grey[900]}`,
        opacity: '1'
      }
    }
  ));
  const tooltipClasses = getTooltipStyles();
  const getTooltipProps = (title) => {
    return {
      title: title,
      className: 'tableButton',
      arrow: true,
      placement: 'top'
    };
  };

  const buttonStyle = {
    border: `1px solid ${theme.palette.grey[900]}`,
    width: '1.5rem',
    height: '1.5rem',
    lineHeight: '1.5rem',
    display: 'flex',
    justifyContent: 'center', 
    alignContent: 'center',  
    margin: '0.1rem',
    borderRadius: '3px', 
    cursor: 'default',
    boxShadow: `1px 1px 1px ${theme.palette.grey[800]}`,
  };
  const boxStyle = {
    display: 'flex',
    justifyContent: 'center'
  };
  
  const infoBox = (
    <Box >
      <Box style={{display:'flex', alignItems: 'center'}}>
        <Box style={{backgroundColor: valid ? light: dark, ...infoStyle}}></Box>
        Valid
      </Box>
      <Box style={{display:'flex', alignItems: 'center'}}>
        <Box style={{backgroundColor: invalid ? light: dark, ...infoStyle}}></Box> 
        Invalid
      </Box>
      <Box style={{display:'flex', alignItems: 'center'}}>
        <Box style={{backgroundColor: satisfiable ? light: dark, ...infoStyle}}></Box> 
        Satisfiable
      </Box>
      <Box style={{display:'flex', alignItems: 'center'}}>
        <Box style={{backgroundColor: unsatisfiable ? light: dark, ...infoStyle}}></Box> 
        Unsatisfiable
      </Box>
    </Box>
  );
  
  return (
    <Box className='SavedTableButtons'>
      <Box style={ boxStyle }>
        <Tooltip classes={tooltipClasses} {...getTooltipProps(collapsed ? 'expand' : 'collapse')}>
          <Box style={buttonStyle} onClick={clickHandlers?.onCollapse}>
            { collapsed ? <ExpandMoreIcon fontSize='small'/>: <ExpandLessIcon fontSize='small'/> }
          </Box>
        </Tooltip>
        <Tooltip classes={tooltipClasses} {...getTooltipProps('previous operation')}>
          <Box style={buttonStyle} onClick={ clickHandlers?.onPrev }>
            <FastRewindTwoToneIcon fontSize='small'/>
          </Box>
        </Tooltip>
        <Tooltip classes={tooltipClasses} {...getTooltipProps('next operation')}>
          <Box style={buttonStyle} onClick={ clickHandlers?.onNext }>
            <FastForwardTwoToneIcon fontSize='small'/>
          </Box>
        </Tooltip>
        <Tooltip placement='top' classes={tooltipClasses} {...getTooltipProps(infoBox)}>
          <Box style={buttonStyle}>
            <InfoTwoToneIcon fontSize='small'/>
          </Box>
        </Tooltip>
        <Tooltip classes={tooltipClasses} {...getTooltipProps('edit')}>
          <Box style={buttonStyle} onClick={ clickHandlers?.onEdit }>
            <EditTwoToneIcon fontSize='small'/>
          </Box>
        </Tooltip>
        <Tooltip classes={tooltipClasses} {...getTooltipProps('delete')}>
          <Box style={buttonStyle} onClick={ clickHandlers?.onDelete }>
            <DeleteTwoToneIcon fontSize='small'/>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}


export default SavedTableButtons;