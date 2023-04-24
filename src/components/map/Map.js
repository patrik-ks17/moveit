import mapStyles from "../../assets/mapStyles";
import { useContext } from "react";
import { useAlert } from "react-alert";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Search from "./Search";
import Location from "./Location";
import { MapContext } from "../../context/Context";
import Information from "./Information";

const mapContainerStyle = {
  width: "100%",
  height: "88%",
};
const center = {
  lat: parseFloat(47.22238413761323),
  lng: parseFloat(19.1766162408318),
};
const options = {
  styles: mapStyles,
  zoomControl: true,
  fullscreenControl: false,
  mapTypeControl: true,
  mapTypeControlOptions: {
    mapTypeIds: ["roadmap", "hybrid"],
  },
  tilt: 25,
};

function Map() {
  const alert = useAlert();
  const { panTo, setShowingInfo, markers, setMarkers, selected, setSelected, startTime, endTime, markerPending, setMarkerPending, onMapLoad, sport } = useContext(MapContext);
  const onMapClick = (event) => {
    if (Object.keys(markerPending).length === 0) {
      if (sport === "") {
        alert.show("Add meg a sport tevékenységet!");
        return;
      } else {
        const timerange = {
          start: startTime,
          end: endTime
        };
        const newMarker = {
          lat: parseFloat(event.latLng.lat()),
          lng: parseFloat(event.latLng.lng()),
          sport: sport,
          time: timerange,
        };
        setSelected(newMarker);
        setShowingInfo(true);
        setMarkerPending(newMarker);
        setMarkers((current) => [...current, newMarker]);
      }
    } else {
      return alert.show("Van kijelölt jelölő!");
    }
  };



  return (
    <div className="google-map w-screen h-[25rem] mb-6 md:w-9/12 lg:w-9/12">
      <div className="flex">
        <Search panTo={panTo} />
        <Location panTo={panTo} />
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lng),
            }}
            onClick={() => {
              setSelected(marker);
              setShowingInfo(true);
            }}
          />
        ))}
        {Object.keys(selected).length !== 0 && <Information />}

      </GoogleMap>
    </div>
  );
}

export default Map;