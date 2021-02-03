import React, { Component } from 'react';
import Header from './Header/Header';
import AirportPhoto from './AirportPhoto/AirportPhoto';
import Rating from './Rating/Rating';
import Weather from './Weather/Weather';
import Runway from './Runway/Runway';
import Button from './Button/Button';
import ScheduledFlights from './ScheduledFlights/ScheduledFlights';
import ArrivalsAndDepartures from './ArrivalsAndDepartures/ArrivalsAndDepartures';
import API from '../../utils/API';
import {
  AirportProps,
  AirportState,
} from '../../types/airportDataTypes';
import './Airport.scss';
import { AIRPORT_TAB_BUTTONS } from '../../utils/airportConstants';

class Airport extends Component<AirportProps, AirportState> {
  constructor(props: AirportProps) {
    super(props);
    this.state = {
      airportInfo: null,
      schedule: null,
      runwaysData: null,
      satelliteImageData: '',
      activeTab: props.activeTab || AIRPORT_TAB_BUTTONS.General.num,
      openPanel: props.isPanelOpen || false,
    };
  }

  componentDidMount(): void {
    const { code } = this.props;
    this.fetchAirportData(code);
  }

  componentDidUpdate(prevProps: AirportProps): void {
    const { code } = this.props;
    const { code: prevCode } = prevProps;
    if (prevCode !== code) {
      this.fetchAirportData(code);
    }
    const { activeTab } = this.props;
    const { activeTab: prevActiveTab } = prevProps;
    if (prevActiveTab !== activeTab) {
      this.changeTabHandler(activeTab);
    }
  }

  changeTabHandler = (num: number): void => {
    this.setState({ activeTab: num });
  };

  closeHandler = (): void => {
    const { setOpenPanel } = this.props;
    this.setState({ openPanel: false });
    setOpenPanel(false);
  };

  fetchAirportData = (code: string): void => {
    API.get(`./api/airport?airportCode=${code}`, { method: 'GET'})
      .then((response) => response.data)
      .then((data) => {
        const {
          details, scheduledRoutesStatistics, runways, satelliteImage,
        } = data.result.response.airport.pluginData;

        this.setState({
          airportInfo: details,
          schedule: scheduledRoutesStatistics,
          runwaysData: runways,
          satelliteImageData: satelliteImage,
        });
      });
  };

  render(): JSX.Element {
    const {
      activeTab,
      airportInfo,
      schedule,
      runwaysData,
      satelliteImageData,
      openPanel,
    } = this.state;
    const { isPanelOpen } = this.props;
    const checkTab1 = activeTab === AIRPORT_TAB_BUTTONS.General.num && airportInfo && schedule
    && satelliteImageData;
    const checkTab2 = activeTab === AIRPORT_TAB_BUTTONS.Arrivals.num && airportInfo;
    const checkTab3 = activeTab === AIRPORT_TAB_BUTTONS.Departures.num && airportInfo;

    return (
      <div id="airport" className={(isPanelOpen || openPanel) ? 'opened' : 'closed'}>
        {!!airportInfo && <Header airportInfo={airportInfo} closeHandler={this.closeHandler} />}
        {checkTab1 && (
          <>
            <AirportPhoto airportInfo={airportInfo} />
            <div className="airport-scroll-wrapper">
              <Weather airportInfo={airportInfo} />
              <Rating iata={airportInfo.code?.iata || ''} name={airportInfo.name || ''} />
              <ScheduledFlights schedule={schedule} />
              <Runway satelliteImage={satelliteImageData || ''} runways={runwaysData || null} />
            </div>
          </>
        )}
        {checkTab2 && <ArrivalsAndDepartures airportCode={airportInfo.code.iata} mode="arrivals" />}
        {checkTab3 && <ArrivalsAndDepartures airportCode={airportInfo.code.iata} mode="departures" />}
        {Object.values(AIRPORT_TAB_BUTTONS).map((button) => (
          <Button
            key={button.num.toString()}
            num={button.num}
            name={button.name}
            active={activeTab}
            changeTabHandler={this.changeTabHandler}
          />
        ))}
      </div>
    );
  }
}

export default Airport;
