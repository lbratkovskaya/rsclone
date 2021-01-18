import React, {
  Component,
  RefObject,
} from 'react';
import { Marker, Popup } from 'react-leaflet';
import L, {
  DivIcon,
  LatLngExpression,
  Marker as LeafletMarker,
} from 'leaflet';
import aircraftIcons from '../../airplane_icons.json';
import { IconFrame, AircraftIcon } from '../../types';
import { getIconByAircraft } from '../../utils/apiUtils';

interface AircraftMarkerProps {
  position: LatLngExpression,
  trackAngle: number,
  callsign: string,
  aircraftType: string,
  onIconClick: () => void,
}

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

  UNSAFE_componentWillReceiveProps = (newProps: AircraftMarkerProps): void => {
    if (newProps.position !== this.props.position) {
      this.markerRef.current.setLatLng(newProps.position);
    }
  };

  getIcon = (aircraftType: string, trackAngle: number): DivIcon => {
    const currentIcon: AircraftIcon = getIconByAircraft(aircraftType);
    const angle: number = (Math.round(this.angleCorrection(trackAngle) / this.angleStep)
      * this.angleStep) % 360;
    const frame: IconFrame = currentIcon.frames[0];
    const angledIcon = frame[angle.toString()];
    const top: number = -1 * angledIcon.y;
    const left: number = -1 * angledIcon.x;
    return L.divIcon({
      html: `<div class="aircraft-icon" style="width:${angledIcon.w}px;height:${angledIcon.h}px;overflow:hidden;position:absolute;background:none;">
      <img src="../../img/t-sprite_c-yellow_w-30_s-yes.png" style="height:${aircraftIcons.h}px;width:${aircraftIcons.w}px;top:${top}px; left:${left}px; position: absolute;"></div>`,
      iconSize: [angledIcon.w, angledIcon.h],
      popupAnchor: [0, angledIcon.h / -2],
    });
  };

  render(): JSX.Element {
    const {
      position,
      trackAngle,
      callsign,
      aircraftType,
      onIconClick,
    } = this.props;

    const icon = this.getIcon(aircraftType, trackAngle);

    return (<Marker
      ref={this.markerRef}
      position={position}
      icon={icon}
      eventHandlers={{
        mouseover: (e) => e.target.openPopup(),
        mouseout: (e) => e.target.closePopup(),
        click: onIconClick,
      }}
    >
      <Popup autoPan={false}>
        {callsign || 'unknown'}
      </Popup>
    </Marker>);
  }
}

export default AircraftMarker;
