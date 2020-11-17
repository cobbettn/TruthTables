import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Context from '../../context';
import getInputProps from '../sentenceLettersConfig';
import { Tooltip } from '@material-ui/core';
import { getTutorialStyles } from '../../lib';

const SentenceLetters = () => {
  const { sentenceLetters, setSentenceLetters, tutorialSteps, setTutorialSteps } = useContext(Context);
  const inputProps = getInputProps(sentenceLetters, setSentenceLetters, tutorialSteps, setTutorialSteps);
  const classes = getTutorialStyles();
  return (
    <Tooltip
      title='Add sentence letter(s)'
      arrow
      placement='left'
      open={!tutorialSteps.addLetter}
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
