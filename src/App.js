import React, { useState } from 'react';
import { CssBaseline, Container, Paper, Box } from '@material-ui/core';
import Context from './context';
import Editor from './Editor/Editor';
import Display from './Display/Display';

const App = () => {
  const [ sentenceLetters, setSentenceLetters ] = useState([]); // the number of different sentence letters available in the editor
  const [ schema, setSchema ] = useState([]); // schema that displays in editor
  const [ schemataList, setSchemataList ] = useState([]); // schemata that have been saved
  
  const provider = {
    sentenceLetters: sentenceLetters,
    schema: schema,
    schemataList: schemataList,
    setSentenceLetters: setSentenceLetters,
    setSchema: setSchema,
    setSchemataList: setSchemataList,
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
