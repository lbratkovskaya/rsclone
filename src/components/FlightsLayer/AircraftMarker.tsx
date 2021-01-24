import React, {
  Component,
  RefObject,
} from 'react';
import { Marker, Popup } from 'react-leaflet';
import L, {
  DivIcon,
  Marker as LeafletMarker,
} from 'leaflet';
import aircraftIcons from '../../airplane_icons.json';
import { IconFrame, AircraftIcon } from '../../types';
import { AircraftMarkerProps } from '../../types/AircraftMarkerType';
import {
  getIconByAircraft,
} from '../../utils/apiUtils';
import {
  nonTrackingIconPath,
  trackingIconPath,
  anglesRound,
  unknownCallsign,
} from '../../utils/constants';

class AircraftMarker extends Component<AircraftMarkerProps> {
  angleStep: number;

  markerRef: RefObject<LeafletMarker>;

  angleCorrection: (angle: number) => number;

  constructor(props: AircraftMarkerProps) {
    super(props);
    this.angleStep = 15;
    this.markerRef = React.createRef<LeafletMarker>();
    this.angleCorrection = (angle: number) => (angle + 360) % 360;
    this.shouldComponentUpdate = () => false;
  }

  componentDidMount(): void {
    this.markerRef.current?.off('click');
  }

  /**
   * Needed for smooth movement of icons
  */
  UNSAFE_componentWillReceiveProps = (newProps: AircraftMarkerProps): void => {
    if (newProps.position !== this.props.position) {
      this.markerRef.current.setLatLng(newProps.position);
    }
    if ((newProps.trackAngle !== this.props.trackAngle)
      || (newProps.withTrack !== this.props.withTrack)) {
      this.markerRef.current.setIcon(this.getIcon(
        newProps.aircraftType,
        newProps.trackAngle,
        newProps.withTrack,
      ));
    }
  };

  getIcon = (aircraftType: string, trackAngle: number, withTrack: boolean): DivIcon => {
    const currentIcon: AircraftIcon = getIconByAircraft(aircraftType);
    const angle: number = (Math.round(this.angleCorrection(trackAngle) / this.angleStep)
      * this.angleStep) % anglesRound;
    const frame: IconFrame = currentIcon.frames[0];
    const angledIcon = currentIcon.rotates ? frame[angle.toString()] : frame['0'];
    const top: number = -1 * angledIcon.y;
    const left: number = -1 * angledIcon.x;
    return L.divIcon({
      html: `<div class="aircraft-icon" style="width:${angledIcon.w}px;height:${angledIcon.h}px;overflow:hidden;position:absolute;background:none;">
      <img src=${withTrack ? trackingIconPath : nonTrackingIconPath} style="height:${aircraftIcons.h}px;width:${aircraftIcons.w}px;top:${top}px; left:${left}px; position: absolute;"></div>`,
      iconSize: [angledIcon.w, angledIcon.h],
      popupAnchor: [0, angledIcon.h / -2],
    });
  };

  render(): JSX.Element {
    const {
      position,
      altitude,
      trackAngle,
      callsign,
      aircraftType,
      withTrack,
      onIconClick,
    } = this.props;

    const icon = this.getIcon(aircraftType, trackAngle, withTrack);

    return (<Marker
      ref={this.markerRef}
      position={position}
      icon={icon}
      zIndexOffset={altitude}
      eventHandlers={{
        mouseover: (e) => e.target.openPopup(),
        mouseout: (e) => e.target.closePopup(),
        click: onIconClick,
      }}
    >
      <Popup>
        {callsign || unknownCallsign}
      </Popup>
    </Marker>);
  }
}

export default AircraftMarker;
