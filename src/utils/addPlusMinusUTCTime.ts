const addPlusMinusUTCTime = (time: string):string => {
  let hours: string |number = +time.slice(0, -3);
  if (hours < 0) {
    if (hours < -9) {
      hours = `-${hours}`;
    } else {
      hours = `-0${hours}`;
    }
  } else if (hours < 9) {
    hours = `+0${hours}`;
  } else {
    hours = `+${hours}`;
  }

  return hours + time.slice(-3);
};

export default addPlusMinusUTCTime;
