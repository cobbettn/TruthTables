import { makeStyles } from '@material-ui/core';

const getTutorialStyles = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.white
  },
  tooltip : {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: '12px',
    boxShadow: `2px 2px 2px ${theme.palette.common.black}`
  }
}));

export { getTutorialStyles };

