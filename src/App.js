import React, { useState } from 'react';
import { CssBaseline, Container, Paper, Box, Link, Typography } from '@material-ui/core';
import Context from './context';
import Editor from './Editor/Editor';
import Display from './Display/Display';
import { getContextProvider } from './lib';
import githubImg from './images/GitHub_Logo_White.png';
import wikiImg from './images/W.png';

const App = () => {
  const contextProvider = getContextProvider(useState);
  return (
    <Box id="app-box" m={2}>
      <CssBaseline/>
      <Container component="main">
        <Box style={{display: 'flex', padding: '0.25rem', alignItems: 'center'}}>
          <Typography style={{flexGrow: '1', textShadow: '2px 2px black'}} variant='h6'>Truth Table Calculator</Typography>
          <Link href="https://github.com/cjn98/TruthTables">
            <img alt="github" style={{height: '0.75rem'}} src={githubImg}/>
          </Link>
          <Link href="https://en.wikipedia.org/wiki/Propositional_calculus" style={{paddingLeft: '0.5rem'}}>
            <img alt="wikipedia" style={{height: '0.75rem'}} src={wikiImg}/>
          </Link>
        </Box>
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
