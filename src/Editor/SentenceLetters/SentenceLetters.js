import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Context from '../../context';

const SentenceLetters = () => {
  const min = 0, max = 6;
  const { sentenceCount, setSentenceCount } = useContext(Context);
  const onChange = (event) => {
    if (event.target.value >= min && event.target.value <= max) setSentenceCount(Number(event.target.value));
  };
  const inputProps = {
    type: 'number',
    min: min,
    max: max,
    value: sentenceCount,
    onChange: onChange,
  };
  return (
    <TextField
      style={{minWidth: '5.5rem'}}
      label="Sentences"
      variant="outlined"
      inputProps={inputProps}
    />
  );
}

export default SentenceLetters;
