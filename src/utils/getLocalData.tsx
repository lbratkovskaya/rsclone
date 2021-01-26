function getLocalData(time:number, offset:number) {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
  return new Date(time * 1000 + offset * 1000 + tzoffset);
}

export default getLocalData;
