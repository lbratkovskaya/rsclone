const getFlightTime = (start: number, end: number): string => {
  const time = Math.ceil((end - start) / 60);
  const hours = Math.floor(time / 60);
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const min = time % 60;
  const minStr = min < 10 ? `0${min}` : min;
  return `${hoursStr}:${minStr}`;
};

export default getFlightTime;
