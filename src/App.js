import React, { useState } from 'react';
import { CssBaseline, Container, Paper, Box } from '@material-ui/core';
import Context from './context';
import Editor from './Editor/Editor';
import Display from './Display/Display';

const App = () => {
  const [ sentenceLetters, setSentenceLetters ] = useState([]);
  const [ schema, setSchema ] = useState({
    symbols: [],
    type: 'P',
  }); 
  const [ premises, setPremises ] = useState([]);
  const [ conclusion, setConclusion ] = useState(null); 
  const [ tutorialSteps, setTutorialSteps ] = useState({
    addLetter: false,
    editorLetter: false,
    editorOperator: false,
    saveSchema: false
  });
  
  const provider = {
    sentenceLetters: sentenceLetters,
    schema: schema,
    premises: premises,
    conclusion: conclusion,
    tutorialSteps: tutorialSteps,
    setSentenceLetters: setSentenceLetters,
    setSchema: setSchema,
    setPremises: setPremises,
    setConclusion: setConclusion,
    setTutorialSteps: setTutorialSteps,
  }

  return (
    <Box m={2}>
      <CssBaseline/>
      <Container component="main">
        <Paper elevation={10}>
          <Context.Provider value={provider}>
            <Box p={2}>
              <Editor/>
              <Display/>
            </Box>
          </Context.Provider>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
