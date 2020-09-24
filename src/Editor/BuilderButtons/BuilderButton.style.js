import theme from '../../theme';
const styles = (makeStyles, validSchema, schemaSize) => {
  const { 
    main:   primaryMain, 
    dark:   primaryDark, 
    light:  primaryLight,
  } = theme.palette.primary;
  return makeStyles(
    {
      common : {
        minWidth: '6rem',
      },
      saveBtn: {
        marginLeft: '0.5rem',
        backgroundColor: validSchema ? primaryMain : null,
        '&:hover': {
          backgroundColor: validSchema ? primaryDark : null,
        },
        '&:active': {
          backgroundColor: validSchema ? primaryLight : null,
        },
      },
      clearBtn: {
        backgroundColor: schemaSize > 0 ? primaryMain : null,
        '&:hover': {
          backgroundColor: schemaSize > 0 ? primaryDark : null,
        },
        '&:active': {
          backgroundColor: schemaSize > 0 ? primaryLight : null,
        },
      },
    }
  );
}

export default styles;