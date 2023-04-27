import "@reach/combobox/styles.css";
import "../assets/style/map/Functions.css";
import "../assets/style/map/UserList.css";
import "../assets/style/map/MapPage.css";
import "../assets/style/map/MarkerSetting.css";
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { format } from 'date-fns'
import UserList from "../components/map/UserList";
import Map from "../components/map/Map";
import MarkerSetting from "../components/map/MarkerSetting";
import DeleteMarker from "../services/DeleteMarker";
import FetchMarkers from "../services/FetchMarkers";
import FetchUsers from "../services/FetchUsers";
import FetchLoggedUser from "../services/FetchLoggedUser";
import Nav from "../components/Nav";
import { HookContext, MapContext } from "../context/Context";


const libraries = ["places"];

export default function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const {alert, navigate} = useContext(HookContext);
  const [loggedUser, setLoggedUser] = useState();
  const [users, setUsers] = useState([]);
  const [markers, setMarkers] = useState([{}]);
  const [selected, setSelected] = useState({});
  const [sport, setSport] = useState("");
  const [startTime, setStartTime] = useState(format(new Date(), "y-MM-dd H:mm"));
  const [endTime, setEndTime] = useState(format(new Date(), "y-MM-dd H:mm"));
  const [showingInfo, setShowingInfo] = useState(false);
  const [markerPending, setMarkerPending] = useState({});
  const [userlist_panel, setPanel] = useState(true);
  const [Fetch, setFetch] = useState(false);

  useEffect(() => {
    FetchMarkers({ setMarkers, alert });
    FetchUsers({ setUsers, alert });
    setFetch(false);
  }, [Fetch, alert]);

  useEffect(() => {
    FetchLoggedUser({ setLoggedUser, alert })
    setFetch(false);
  }, [Fetch, alert])

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }, zoom) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoom);
  }, []);

  function switchPanel(e) {
    const curr_pnl = e.target.value;
    if (curr_pnl === "list") setPanel(true);
    else if (curr_pnl === "marker") setPanel(false);
    const panels = document.querySelector("#map-panels")
    panels.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (loadError) return "Térkép betöltése sikertelen!";
  if (!isLoaded) return "Térkép betöltése....";
  return (
    <div className="back-map-page">
      <div>
        <Nav />
        <MapContext.Provider value={{ loggedUser, users, setUsers, markers, setMarkers, selected, setSelected, startTime, setStartTime, endTime, setEndTime, showingInfo, setShowingInfo, markerPending, setMarkerPending, panTo, onMapLoad, DeleteMarker, sport, setSport, setFetch }}>
          <div className="map-page container">
            <h1>Térkép</h1>
            <div className="w-12/12 flex flex-col items-center lg:inline-flex lg:items-start lg:w-11/12 lg:flex-row">
              <Map />
              <div className="w-screen flex flex-col items-center lg:ml-24 lg:items-start lg:w-4/12">
                <div id="rbtn" onChange={(e) => switchPanel(e)}>
                  <input type="radio" id="rb1" name="rb" value="list" defaultChecked />
                  <label htmlFor="rb1">Felh. lista</label>
                  <input type="radio" id="rb2" name="rb" value="marker" />
                  <label htmlFor="rb2">Jelölő</label>
                </div>
                <div id="map-panels" className="w-11/12 md:w-8/12">
                  {userlist_panel === true ? <UserList /> : <MarkerSetting />}
                </div>
              </div>
            </div>
          </div>
        </MapContext.Provider>
      </div>
    </div>
  );
}
