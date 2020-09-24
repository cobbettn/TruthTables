import React from 'react';
import { getSchemaTable } from '../displayTableLogic';

const EditorTable = (props) => {
  const editorTable = getSchemaTable(props);
  return (
    <div>
      { editorTable }
    </div>
  );
}

export default EditorTable;
