import { getOpCount } from '../../lib';
export const getTableButtonHandlers = (stateObj) => {
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