import React, { useState } from 'react';
import { CssBaseline, Container, Paper, Box } from '@material-ui/core';
import Editor from './Editor/Editor';
import Display from './Display/Display';
import Context from './context';

const App = () => {
  const [ sentenceCount, setSentenceCount ] = useState(0); // the number of different sentence letters available in the editor
  const [ schema, setSchema ] = useState([]); // schema that displays in editor
  const [ schemataList, setSchemataList ] = useState([]); // schemata that have been saved
  const provider = {
    sentenceCount: sentenceCount,
    schema: schema,
    schemataList: schemataList,
    setSentenceCount: setSentenceCount,
    setSchema: setSchema,
    setSchemataList: setSchemataList,
  };
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
