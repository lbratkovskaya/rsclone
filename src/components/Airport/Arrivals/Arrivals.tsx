import React, { useEffect } from 'react';

interface ArrivalsProps {
  code: string,
  time: string
}

const hoursInterval = 6;
const millisecInHour = 3600000;

const Arrivals:React.FC<ArrivalsProps> = ({ code, time }: ArrivalsProps) => {
  useEffect(() => {
    const fromLocal = time.slice(0, 16);
    const currentDate = new Date(time.slice(0, 19));
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const toLocal = new Date(currentDate.getTime() + hoursInterval * millisecInHour - tzoffset).toISOString();
    console.log(toLocal.slice(0, 16));
    try {
      fetch(`https://aerodatabox.p.rapidapi.com/flights/airports/icao/${code}/${fromLocal}/${toLocal.slice(0, 16)}?withLeg=true&withCancelled=true&withCodeshared=true`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '62d5080ea6msh20280fa2924efafp1db373jsnba4406f081aa',
          'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch {
      
    }
  }, [code]);

  return (
    <div />
  );
};

export default Arrivals;
