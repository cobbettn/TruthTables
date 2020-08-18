import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Context from '../../context';
import getInputProps from './sentenceLettersConfig';

const SentenceLetters = () => {
  const { sentenceCount, setSentenceCount } = useContext(Context);
  const inputProps = getInputProps(sentenceCount, setSentenceCount);
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
