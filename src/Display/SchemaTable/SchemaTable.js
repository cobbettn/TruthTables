import React from 'react';
import TableHeader from '../SchemaTable/TableHeader/TableHeader';
import TableRows from '../SchemaTable/TableRows/TableRows';
import DisplayTable from '../SchemaTable/DisplayTable/DisplayTable';
import { validateSchema } from '../../lib';
import { getTableDimensions, getTableModel, computeTable, getOpCount } from '../../lib';
import theme from '../../theme';

const SchemaTable = (props) => {
  const { schema, sentenceLetters, isSavedTable } = props;
  let { symbols } = schema;
  let tableModel = getTableModel({...props});
  const { numRows } = getTableDimensions(sentenceLetters.length)
  const getStyle = (isSavedTable) => ({ 
    alignSelf: 'center',
    backgroundColor: !isSavedTable ? theme.palette.primary.dark : theme.palette.grey[700],
  });
  const style = getStyle(isSavedTable);  
  let schemaTableHeaders = (<TableHeader symbols={symbols}/>);
  let schemaTable = (<TableRows symbols={symbols} model={tableModel}/>);
  
  if (validateSchema(symbols)) {
    const copyTableModel = tableModel.map(row => row.slice());
    const allOps = computeTable({...schema, steps: getOpCount(symbols)}, copyTableModel, numRows);
    schema.maxStepsOpCol = allOps.mainOpColumn;
    const { mainOpIndex, mainOpColumn } = computeTable({...schema}, tableModel, numRows);
    schema.mainOpColumn = mainOpColumn;
    schema.tableInfo = {
      valid: !mainOpColumn.some(el => el === false),
      invalid: mainOpColumn.some(el => el === false),
      satisfiable: mainOpColumn.some(el => el === true),
      unsatisfiable: !mainOpColumn.some(el => el === true)
    }

    schemaTableHeaders = (<TableHeader symbols={symbols} mainOpIndex={mainOpIndex}/>);
    schemaTable = (<TableRows model={tableModel} mainOpIndex={mainOpIndex}/>);
  }
  
  return (
    <DisplayTable
      { ...props }
      style={ style }
      headers={ schemaTableHeaders }
      table={ schemaTable }
    />
  );
};

export default SchemaTable;