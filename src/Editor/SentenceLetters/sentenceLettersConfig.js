export default (count, setCount) => {
  const min = 0, max = 6;
  const onChange = (event) => {
    if (event.target.value >= min && event.target.value <= max) setCount(Number(event.target.value));
  };
  return {
    type: 'number',
    min: min,
    max: max,
    value: count,
    onChange: onChange,
  };
};