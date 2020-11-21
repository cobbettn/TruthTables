import React from 'react';
import { Card } from '@material-ui/core';
import SavedTableButtons from './SavedTableButtons/SavedTableButtons';
import EditorToggle from './EditorToggle/EditorToggle';
import { getTableStyles } from './DisplayTable.style.js';

const DisplayTable = (props) => {
  const { style, headers, table, clickHandlers, isSavedTable, collapsed, schemaType } = props;
  const tableStyle = getTableStyles(isSavedTable);
  const saved = <SavedTableButtons collapsed={collapsed} clickHandlers={clickHandlers}/>;
  const editor = <EditorToggle schemaType={schemaType} clickHandlers={clickHandlers}/>;
  return (
    <Card raised className="Card" style={style}>
      { isSavedTable ? saved : editor }
      <div style={tableStyle}>
        <table>
          { headers }
          { !collapsed && table }
        </table>
      </div>
    </Card>
  );
}

export default DisplayTable;