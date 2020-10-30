import React, { useState } from 'react';
import { CssBaseline, Container, Paper, Box } from '@material-ui/core';
import Context from './context';
import Editor from './Editor/Editor';
import Display from './Display/Display';

const App = () => {
  const [ sentenceLetters, setSentenceLetters ] = useState([]); // the number of different sentence letters available in the editor
  const [ schema, setSchema ] = useState({
    symbols: [],
    type: 'P',
    steps: null
  }); // schema that displays in editor
  const [ premises, setPremises ] = useState([]); // schemata that have been saved
  const [ conclusion, setConclusion ] = useState(null); // the conclusion
  
  const provider = {
    sentenceLetters: sentenceLetters,
    schema: schema,
    premises: premises,
    conclusion: conclusion,
    setSentenceLetters: setSentenceLetters,
    setSchema: setSchema,
    setPremises: setPremises,
    setConclusion: setConclusion,
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
