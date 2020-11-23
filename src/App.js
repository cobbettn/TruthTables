import React, { useState } from 'react';
import { CssBaseline, Container, Paper, Box } from '@material-ui/core';
import Context from './context';
import Editor from './Editor/Editor';
import Display from './Display/Display';
import { getContextProvider } from './lib';

const App = () => {
  const contextProvider = getContextProvider(useState);
  return (
    <Box m={2}>
      <CssBaseline/>
      <Container component="main">
        <Paper elevation={10}>
          <Context.Provider value={ contextProvider }>
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
