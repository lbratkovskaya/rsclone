function getLocalData(time:number, offset:number): Date {
  const msecInHour = 60000;
  const tzoffset = (new Date()).getTimezoneOffset() * msecInHour; // offset in milliseconds
  const diffInFlightRadar = 1000;
  return new Date(time * diffInFlightRadar + offset * diffInFlightRadar + tzoffset);
}

export default getLocalData;
