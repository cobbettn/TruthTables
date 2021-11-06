import React, { useContext } from 'react';
import { Tooltip, TextField } from '@material-ui/core';
import Context from '../../context';
import { getTutorialStyles } from '../tutorialStyles';
import { pink, orange, yellow, lightGreen, cyan, purple } from '@material-ui/core/colors';


const SentenceLetters = () => {
  const context = useContext(Context);
  
  const classes = getTutorialStyles();
  const getInputProps =  (context) => {
    const colors =  [purple, pink, orange, yellow, lightGreen, cyan];
    const { 
      schema,
      premises,
      conclusion,
      sentenceLetters,
      setSentenceLetters, 
      tutorialSteps, 
      setTutorialSteps,
    } = context;
    const min = 0, max = 6;
  
    const onChange = (event) => {
      const number = Number(event.target.value);
      
      let safeDelete = true;
      
      if (number < sentenceLetters.length) {
        const letters = getCurrentLetters();
        const { value } = sentenceLetters[sentenceLetters.length - 1]; // the letter to be deleted
        if (letters.has(value)) safeDelete = false;
      };
  
      if (number >= min && number <= max && safeDelete) {
        
        // tutorial logic
        if (number > 0 && !tutorialSteps.addLetter) {
          setTutorialSteps ({...tutorialSteps, addLetter: true});
        }
        if (number === 0 && tutorialSteps.addLetter && !tutorialSteps.editorLetter && !tutorialSteps.saveSchema) {
          setTutorialSteps({...tutorialSteps, addLetter: false});
        }
        
        const letters = [...Array(number)].map((el, i) => {
          return {
            value: String.fromCharCode(112 + i),
            elType: 'L',
            bgColor: colors[i][500],
          }
        });
        setSentenceLetters([...letters]); // update state
      }
    };
  
    const getCurrentLetters = () => {
      const letters = new Set();
      if (schema.symbols.length > 0 ) schema.symbols.filter(symbol => symbol.elType === 'L').forEach(letter => letters.add(letter.value));
      if (premises.length > 0) {
        premises.forEach(premise => {
          premise.symbols.filter(symbol => symbol.elType === 'L').forEach(letter => letters.add(letter.value))
        });
      }
      if (!!conclusion) {
        conclusion.symbols.filter(symbol => symbol.elType === 'L').forEach(letter => letters.add(letter.value));
      }
      return letters;
    }
  
    return {
      type: 'number',
      min: min,
      max: max,
      value: sentenceLetters.length,
      onChange: onChange,
    };
  };
  const inputProps = getInputProps(context);
  
  return (
    <Tooltip
      title='Add sentence letter(s)'
      arrow
      placement='left'
      open={ !context.tutorialSteps.addLetter }
      classes={ classes }
    >
      <TextField
        style={ { width: '5rem', borderRadius: '5px' } }
        label="Letters"
        variant="outlined"
        inputProps={ inputProps }
        className='hover'
      />
    </Tooltip>
  );
}

export default SentenceLetters;
