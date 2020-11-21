import React, { useContext } from 'react';
import { Tooltip, TextField } from '@material-ui/core';
import Context from '../../context';
import { getInputProps } from './lib';
import { getTutorialStyles } from '../../lib';

const SentenceLetters = () => {
  const context = useContext(Context);
  const inputProps = getInputProps(context);
  const classes = getTutorialStyles();
  return (
    <Tooltip
      title='Add sentence letter(s)'
      arrow
      placement='left'
      open={!context.tutorialSteps.addLetter}
      classes={classes}
    >
      <TextField
        style={{width: '4.5rem'}}
        label="Letters"
        variant="outlined"
        inputProps={inputProps}
      />
    </Tooltip>
  );
}

export default SentenceLetters;
