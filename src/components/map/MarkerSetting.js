import React, { useContext } from "react";
import PushMarker from "../../services/PushMarker";
import DateTimePicker from "react-datetime-picker";
import { format } from 'date-fns'
import { MapContext } from "../../context/Context";

function MarkerSetting() {
  const { markers, setMarkers, selected, setSelected, startTime, setStartTime, endTime, setEndTime, setMarkerPending, loggedUser, sport, setSport, setFetch } = useContext(MapContext)
  const {alert} = useContext(HookContext)

  async function lc_editMarker(){
    if (Object.keys(selected).length === 0) {
      alert.show("Válassz ki egy helyet a térképen!");
    } else {
      const timerange = {
        start: startTime,
        end: endTime
      };
      markers.map((marker, index) => {
        if (marker.lat === selected.lat && marker.lng === selected.lng) {
          markers[index].sport = sport;
          markers[index].time = timerange;
        }
        return null;
      });
      await PushMarker({selected, alert});
      await setSelected({});
      await setMarkerPending({});
      setFetch(true);
      alert.success("Jelölő sikeresen hozzáadva");
    }
  }

  function lc_cancelMarker() {
    setSelected({});
    setMarkerPending({});
    setFetch(true);
    setMarkers(loggedUser.markers);
  }

  return (
    <div
      className="marker-panel w-11/12 h-96 m-auto mb-10 md:w-7/12
    lg:w-72 lg:mt-10"
    >
      <form id="markerform">
        <span>Sport</span>
        <input type={"text"} name={"sport"} value={sport} onChange={e => setSport(e.target.value)}/>
        <span>Kezdés</span>
        <DateTimePicker
          onChange={(e) => setStartTime(format(e, "y-MM-dd H:mm"))}
          value={startTime}
          disableClock
          disableCalendar
          locale="hu-HU"
          className="timepicker"
          format="y-MM-dd H:mm"
        />
        <span>Vége</span>
        <DateTimePicker
          onChange={(e) => setEndTime(format(e, "y-MM-dd H:mm"))}
          value={endTime}
          disableClock
          disableCalendar
          locale="hu-HU"
          className="timepicker"
          format="y-MM-dd H:mm"
        />

        <button type={"button"} onClick={lc_editMarker}>
          Felvesz
        </button>
        <button type={"button"} onClick={lc_cancelMarker}>
          Visszavon
        </button>
      </form>
    </div>
  );
}

export default MarkerSetting;
