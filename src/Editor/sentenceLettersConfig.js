import Colors from '../letterColors';

const getInputProps =  (sentenceLetters, setSentenceLetters, tutorialSteps, setTutorialSteps) => {
  const min = 1, max = 6;
  const onChange = (event) => {
    if (event.target.value >= min && event.target.value <= max) {
      const number = Number(event.target.value);
      if (number > 0 && !tutorialSteps.addLetter) setTutorialSteps ({...tutorialSteps, addLetter: true});
      const letters = [...Array(number)].map((el, i) => {
        return {
          value: String.fromCharCode(112 + i), 
          elType: 'L',
          bgColor: Colors[i]['500'],
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

export default getInputProps;
