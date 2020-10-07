import React from 'react';
import { getSchemaTable } from '../displayTableLogic';

const EditorTable = (props) => {
  const editorTable = getSchemaTable({...props, showButtons: false});
  return (
    <div style={{display: 'flex'}}>
      { editorTable }
    </div>
  );
}

export default EditorTable;
