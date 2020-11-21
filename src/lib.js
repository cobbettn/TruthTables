/**
 * Creates a top-level context for handling app state
 * 
 * @param {*} _useState 
 */
const getContextProvider = (_useState) => {
  const defaultSentenceLetters = [];
  const defaultSchema = { symbols: [], type: 'P' };
  const defaultPremises = [];
  const defaultConclusion = null;
  const defaultTutorialSteps = { addLetter: false, editorLetter: false, editorOperator: false, saveSchema: false };
  
  const [ sentenceLetters, setSentenceLetters ] = _useState(defaultSentenceLetters);
  const [ schema, setSchema ] = _useState(defaultSchema); 
  const [ premises, setPremises ] = _useState(defaultPremises);
  const [ conclusion, setConclusion ] = _useState(defaultConclusion); 
  const [ tutorialSteps, setTutorialSteps ] = _useState(defaultTutorialSteps);
  
  const state = {
    sentenceLetters: sentenceLetters,
    schema: schema,
    premises: premises,
    conclusion: conclusion,
    tutorialSteps: tutorialSteps
  };
  const stateSetters = {
    setSentenceLetters: setSentenceLetters,
    setSchema: setSchema,
    setPremises: setPremises,
    setConclusion: setConclusion,
    setTutorialSteps: setTutorialSteps
  };

  return {
    ...state,
    ...stateSetters,
  };
};

/**
 * Checks if a schema is well-formed
 * 
 * @param {*} schema 
 */
const validateSchema = (schema) => {
  let isValid = true;

  if (schema.length === 0) {
    return false; // empty schema
  } 
  else {
    let L, R;
    let openParen = 0, closeParen = 0;
    // compare each symbol in the schema with its adjacent symbols
    schema.forEach((symbol, i) => {
      L = schema[i - 1];
      R = schema[i + 1];
      switch (symbol.elType) {
        case 'L': // LETTERS
          if (L?.elType === 'L') {
            isValid = false;
          }
          break;
        case 'N': // NEGATION
          if (!R || L?.elType === 'L' || R?.elType === 'O') {
            isValid = false;
          }
          break;
        case 'O': // BINARY OPERATORS
          if (!R || !L || R?.elType === 'O' || L?.elType === 'O') {
            isValid = false;
          }  
          break;
        case 'G': // GROUPING
          if (symbol.value === '(') { // open logic
            if (L?.elType === 'L' || L?.value === ')' || R?.value === ')') {
              isValid = false; 
            }
            openParen++;
          }
          if (symbol.value === ')') { // close logic
            if (L?.elType === 'O' || L?.elType === 'N' || R?.elType === 'L' || R?.elType === 'N' ) {
              isValid = false;
            } 
            closeParen++;
          }
          break;
        default:
      } 
    });
    // unclosed parentheses
    if (openParen !== closeParen) isValid = false;
  }

  return isValid;
}

const getMaxSteps = (schema) => {
  const stepsReducer = (acc, cur) => cur.elType === 'O' || cur.elType === 'N' ? acc + 1 : acc;
  return schema?.reduce(stepsReducer, 0);
}

export { 
  getMaxSteps, 
  getContextProvider, 
  validateSchema
};
