import React from 'react';
import { Card, Collapse } from '@material-ui/core';
import SavedTableButtons from './SavedTableButtons/SavedTableButtons';
import EditorToggle from './EditorToggle/EditorToggle';
import { getTableStyles } from './DisplayTable.style.js';

const DisplayTable = (props) => {
  const { style, headers, table, clickHandlers, isSavedTable, schema } = props;
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