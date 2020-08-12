import theme from '../../theme';
const styles = (makeStyles, validSchema, schemaSize) => {
  return makeStyles(
    {
      common : {
        minWidth: '6rem',
      },
      saveBtn: {
        marginLeft: '0.5rem',
        backgroundColor: validSchema ? theme.palette.primary.main : null,
        '&:hover': {
          backgroundColor: validSchema ? theme.palette.primary.dark : null,
        },
        '&:active': {
          backgroundColor: validSchema ? theme.palette.primary.light : null,
        },
      },
      clearBtn: {
        backgroundColor: schemaSize > 0 ? theme.palette.primary.main : null,
        '&:hover': {
          backgroundColor: schemaSize > 0 ? theme.palette.primary.dark : null,
        },
        '&:active': {
          backgroundColor: schemaSize > 0 ? theme.palette.primary.light : null,
        },
      },
    }
  );
}

export default styles;