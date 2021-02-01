import getLocalData from './getLocalData';

const getDateHistory = (num: number): string => {
  const str = getLocalData(num, 0).toString();
  return str.slice(8, 11) + str.slice(4, 8);
};

export default getDateHistory;
