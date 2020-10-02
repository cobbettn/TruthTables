const dragEnd = (drag, stateObj) => {
  const { premises, setPremises, conclusion, setConclusion } = stateObj;
  const { destination, source } = drag;
  const { index: sourceIndex , droppableId: sourceId } = source;
  if (sourceId === 'PremiseDropZone') {
    if (destination?.droppableId === 'PremiseDropZone') {
      const [el] = premises.splice(sourceIndex, 1);
      premises.splice(destination.index, 0, el);
      setPremises([...premises]);
    }
    if (destination?.droppableId === 'ConclusionDropZone') {
      const [el] = premises.splice(sourceIndex, 1);
      if (conclusion) setPremises([...premises, conclusion]);
      setConclusion(el);
    }
  }
  if (sourceId === 'ConclusionDropZone')  {
    if (destination?.droppableId === 'PremiseDropZone') {
      setPremises([...premises, conclusion]);
      setConclusion(null);
    }
  }
}

export default dragEnd;