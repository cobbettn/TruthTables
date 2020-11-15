import { makeStyles } from "@material-ui/core";

const getMaxSteps = (schema) => {
  const stepsReducer = (acc, cur) => cur.elType === 'O' || cur.elType === 'N' ? acc + 1 : acc;
  return schema.reduce(stepsReducer, 0);
}

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

export { getMaxSteps, getTutorialStyles };