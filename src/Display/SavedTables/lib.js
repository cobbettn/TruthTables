import { getOpCount, getTableDimensions } from '../../lib';

const dragEnd = (drag, context) => {
  const { destination, source } = drag;
  const { premises, setPremises, conclusion, setConclusion } = context;
  const { index: sourceIndex, droppableId: sourceId } = source;
  if (sourceId === 'PremiseDropZone') {
    if (destination?.droppableId === 'PremiseDropZone') {
      const [el] = premises.splice(sourceIndex, 1);
      premises.splice(destination.index, 0, el);
      setPremises([...premises]);
    }
    if (destination?.droppableId === 'ConclusionDropZone') {
      const [el] = premises.splice(sourceIndex, 1);
      if (conclusion) setPremises([...premises, { ...conclusion, type: 'P'}]);
      setConclusion({...el, type : 'C'});
    }
    // delete by drag off 
    if (!destination) {
      premises.splice(sourceIndex, 1);
      setPremises([...premises]);
    }
  }
  if (sourceId === 'ConclusionDropZone') {
    if (destination?.droppableId === 'PremiseDropZone') {
      setPremises([...premises, {...conclusion, type: 'P'}]);
      setConclusion(null);
    }
    // delete by drag off 
    if (!destination) {
      setConclusion(null);
    }
  }
}

const getTableButtonHandlers = (stateObj) => {
  const { data, setData, setSchema } = stateObj;
  const maxSteps = getOpCount(data?.symbols);
  const onCollapse = () => setData({...data, collapsed: !data.collapsed});
  const onPrev = () => {
    if (data.steps > 0)  {
      data.steps--;
      setData({...data});
    }
  };
  const onNext = () => {
    if (data.steps < maxSteps) {
      data.steps++;
      setData({...data});
    }
  };
  const onEdit = () => {
    setData(null);
    setSchema({...data, steps: maxSteps});
  };
  const onDelete = () => setData(null);

  return {
    onEdit: onEdit,
    onDelete: onDelete,
    onNext: onNext,
    onPrev: onPrev,
    onCollapse: onCollapse,
  }
}

const getImplies = (props) => {
  let implies = false; 
  const { sentenceLetters, premises, conclusion } = props;
  const { numRows } = getTableDimensions(sentenceLetters.length);
  if (premises.length > 0 && !!conclusion) {
    implies = true;
  
    let reducedPremises = [];
    
    for (let i = 0; i < numRows; i++) {
      let rowVal;
      premises.forEach(premise => {
        const mainOpVal = premise.maxStepsOpCol[i];
        rowVal = rowVal === undefined ? mainOpVal : (rowVal && mainOpVal);
      });
      reducedPremises.push(rowVal);
    }
    
    for (let i = 0; i < numRows; i++) {
      if (reducedPremises[i] === true && conclusion.maxStepsOpCol[i] === false) {
        implies = false;
        break;
      }
    }
  }

  return implies;
}

export { dragEnd, getTableButtonHandlers, getImplies };