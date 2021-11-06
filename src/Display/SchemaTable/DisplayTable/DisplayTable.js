import React from 'react';
import { Card, Collapse } from '@material-ui/core';
import SavedTableButtons from './SavedTableButtons/SavedTableButtons';
import EditorToggle from './EditorToggle/EditorToggle';
import theme from '../../../theme';

const DisplayTable = (props) => {
  const { style, headers, table, clickHandlers, isSavedTable, schema } = props;
  const getTableStyles = isSavedTable => ({
    display: 'flex', 
    justifyContent: 'center', 
    backgroundColor: isSavedTable ? theme.palette.grey[600] : theme.palette.primary.main,
    margin: '0.2rem',
    padding: '0.2rem',
    borderRadius: '3px'
  });
  const tableStyle = getTableStyles(isSavedTable);
  const saved = <SavedTableButtons schema={ schema } clickHandlers={ clickHandlers }/>;
  const editor = <EditorToggle schemaType={ schema.type } clickHandlers={ clickHandlers }/>;
  return (
    <Collapse 
      in={ schema.symbols.length > 0 }
      style={ {alignSelf: 'center'} } 
    > 
      <Card 
        raised 
        className='Card' 
        style={ style }
      >
        { isSavedTable ? saved : editor }
        <div style={ tableStyle }>
          <table>
            { headers }
            { !schema.collapsed && table }
          </table>
        </div>
      </Card>
    </Collapse>
  );
}

export default DisplayTable;