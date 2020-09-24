import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Context from '../../context';
import getInputProps from '../sentenceLettersConfig';

const SentenceLetters = () => {
  const { sentenceLetters, setSentenceLetters } = useContext(Context);
  const inputProps = getInputProps(sentenceLetters, setSentenceLetters);
  return (
    <TextField
      style={{width: '5.5rem'}}
      label="Sentences"
      variant="outlined"
      inputProps={inputProps}
    />
  );
}

export default SentenceLetters;
