import React from 'react';
import validateSchema from '../../../validateSchema';
import { getTableDimensions, getLegend, getTableModel, computeTable } from '../../DisplayLogic';
import theme from '../../../theme';
import TableHeader from '../SchemaTable/TableHeader/TableHeader';
import TableRows from '../SchemaTable/TableRows/TableRows';
import DisplayTable from '../../DisplayTable/DisplayTable';


const SchemaTable = (props) => {
  const { schema, sentenceLetters, clickHandlers, isSavedTable } = props;
  let { symbols, steps } = schema;
  const { numRows } = getTableDimensions(sentenceLetters.length);
  const legend = getLegend(sentenceLetters);
  const tableModel = getTableModel(symbols, numRows, legend);
  let schemaTableHeaders = (<TableHeader symbols={symbols}/>);
  let schemaTable = (<TableRows model={tableModel}/>);
  const style = { 
    display: symbols.length === 0 && 'none',
    backgroundColor: !isSavedTable ? theme.palette.primary.dark : theme.palette.grey[700]
  }
  if (validateSchema(symbols)) {
    const mainOpIndex = computeTable({
      tableModel: tableModel,
      schema: schema, 
      numRows: numRows,
      steps: steps
    });
    schemaTableHeaders =  (<TableHeader symbols={symbols} mainOpIndex={mainOpIndex}/>);
    schemaTable = (<TableRows model={tableModel} mainOpIndex={mainOpIndex}/>);
  }
  return (
    <DisplayTable
      style={style}
      headers={schemaTableHeaders}
      table={schemaTable}
      clickHandlers={clickHandlers}
      isSavedTable={isSavedTable}
      collapsed={schema.collapsed}
      schemaType={schema.type}
    />
  );
};

export default SchemaTable;