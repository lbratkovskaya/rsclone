const getAirlineLogo = (iata: string, icao: string): HTMLImageElement => {
  const img = document.createElement('img');
  let isLoadedFromFirst = false;
  img.src = `https://cdn.flightradar24.com/assets/airlines/logotypes/${airlineCodeIata}_${airlineCodeIcao}.png`;
  img.onload = () => {
    isLoadedFromFirst = true;
  };

  if (!isLoadedFromFirst) {
    img.src = `https://content.airhex.com/content/logos/airlines_${airlineCodeIata}_60_20_r.png`;
  }
  return img;
};
