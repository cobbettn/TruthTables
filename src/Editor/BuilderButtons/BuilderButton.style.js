import theme from '../../theme';

const getStyles = (makeStyles, validSchema, schemaSize, schemaType) => {
  const { 
    main:   primaryMain, 
    dark:   primaryDark, 
    light:  primaryLight,
  } = theme.palette.primary;
  const {
    main:   secondaryMain,
    dark:   secondaryDark,
    light:  secondaryLight
  } = theme.palette.secondary;
  const isPremise = schemaType === 'P';
  return makeStyles(
    {
      common : {
        minWidth: '6rem',
      },
      saveBtn: {
        marginLeft: '0.5rem',
        backgroundColor: (validSchema && schemaSize > 0) ? isPremise ? primaryMain : secondaryMain: '',
        '&:hover': {
          backgroundColor: (validSchema && schemaSize > 0) ? isPremise ? primaryDark : secondaryDark: '',
        },
        '&:active': {
          backgroundColor: (validSchema && schemaSize > 0) ? isPremise ? primaryLight : secondaryLight: '',
        },
      },
      clearBtn: {
        backgroundColor: schemaSize > 0 ? isPremise ? primaryMain : secondaryMain : '',
        '&:hover': {
          backgroundColor: schemaSize > 0 ? isPremise ? primaryDark : secondaryDark : '',
        },
        '&:active': {
          backgroundColor: schemaSize > 0 ? isPremise ? primaryLight : secondaryLight : '',
        },
      },
    }
  );
}

export { getStyles };