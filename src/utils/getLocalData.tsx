import { msecInHour, diffInFlightRadar } from './airportConstants';

function getLocalData(time:number, offset:number) {
  const tzoffset = (new Date()).getTimezoneOffset() * msecInHour; // offset in milliseconds
  return new Date(time * diffInFlightRadar + offset * diffInFlightRadar + tzoffset);
}

export default getLocalData;
