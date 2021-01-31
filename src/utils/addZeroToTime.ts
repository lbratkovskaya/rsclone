const addZeroToTimes = (offset: number): string => {
  const hours = offset / 3600;
  let UTCTime = (hours) < 10 ? `+0${hours}`
    : hours;
  if (hours > -1 && hours < 10) {
    UTCTime = `+0${hours}`;
  } else if (hours < -1 && hours > -10) {
    UTCTime = `-0${Math.abs(hours)}`;
  } else {
    UTCTime = `+${hours}`;
  }
  return UTCTime;
};

export default addZeroToTimes;
