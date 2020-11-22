import { pink, orange, yellow, lightGreen, cyan, purple } from '@material-ui/core/colors';

const getInputProps =  (context) => {
  const colors =  [purple, pink, orange, yellow, lightGreen, cyan];
  const { sentenceLetters, setSentenceLetters, tutorialSteps, setTutorialSteps } = context;
  const min = 0, max = 6;
  const onChange = (event) => {
    if (event.target.value >= min && event.target.value <= max) {
      const number = Number(event.target.value);
      if (number > 0 && !tutorialSteps.addLetter) setTutorialSteps ({...tutorialSteps, addLetter: true});
      if (number === 0 &&  tutorialSteps.addLetter && !tutorialSteps.editorLetter && !tutorialSteps.saveSchema) {
        setTutorialSteps({...tutorialSteps, addLetter: false});
      }
      const letters = [...Array(number)].map((el, i) => {
        return {
          value: String.fromCharCode(112 + i), 
          elType: 'L',
          bgColor: colors[i][500],
        }
      });
      setSentenceLetters([...letters]);
    } 
  };
  return {  
    type: 'number',
    min: min,
    max: max,
    value: sentenceLetters.length,
    onChange: onChange,
  };
};

export { getInputProps };
