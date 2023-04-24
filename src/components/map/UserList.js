import React, { useContext } from "react";
import { MapContext } from "../../context/Context";

function UserList() {
  const {users, loggedUser, setMarkers, panTo} = useContext(MapContext)
  
  function panToMarker(lat, lng, zoom) {
    try {
      panTo(
        {
          lat: lat,
          lng: lng,
        },
        zoom
      );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div
      className="user-panel w-11/12 h-80 mb-10 m-auto md:w-7/12
    lg:w-72 lg:h-72 lg:mt-10"
    >
      <div className="btn-mymarker">
        <button
          onClick={() => {
            setMarkers(loggedUser.markers);
            panToMarker(47.22238413761323, 19.1766162408318, 7);
          }}
        >
          Jelöléseim
        </button>
      </div>
      <div className="users-list h-5/6">
        <div>
          <ul>
            {users.map((user, index) => {
              return (
                <div key={index} className="user-box">
                  <p
                    key={user._id}
                    onClick={() => {
                      setMarkers(user.markers);
                      panToMarker(47.22238413761323, 19.1766162408318, 7);
                    }}
                  >
                    {user.username}
                  </p>
                  <ul>
                    {user.markers.map((marker, index) => {
                      return (
                        <li
                          className="listed-marker"
                          key={index}
                          onClick={() => {
                            setMarkers(user.markers);
                            panToMarker(marker.lat, marker.lng, 13);
                          }}
                        >
                          <span>{marker.sport}</span>
                          <span>
                            {marker.time.start + " - " + marker.time.end}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserList;
