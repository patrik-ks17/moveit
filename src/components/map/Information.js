import { InfoWindowF } from "@react-google-maps/api";
import { useContext } from "react";
import { HookContext, MapContext } from "../../context/Context";


export default function Information() {
	const { showingInfo, setShowingInfo, selected, setSelected, markers, DeleteMarker, markerPending, setMarkerPending, loggedUser, setFetch, selectedUser } = useContext(MapContext);
	const {alert} = useContext(HookContext)
	const { myMarker } = IsMyMarker();

	function IsMyMarker() {
		let myMarker = false;
		let marker = "";
		let index = -1;
		markers.map((marker_val, i) => {
			if (
				JSON.stringify(marker_val) === JSON.stringify(selected) &&
				loggedUser !== undefined
			) {
				loggedUser.markers.map((usermarker) => {
					if (JSON.stringify(usermarker) === JSON.stringify(selected)) {
						myMarker = true;
						marker = marker_val;
						index = i;
					}
					return null;
				});
			}
			return null;
		});
		return { myMarker, marker, index };
	}

	function lc_removeMarker() {
		const { myMarker, marker, index } = IsMyMarker({ markers, selected, loggedUser });
		if (myMarker) {
			markers.splice(index, 1);
			DeleteMarker({ selected, alert });
			setSelected({});
			if (JSON.stringify(marker) === JSON.stringify(markerPending)) {
				setMarkerPending({});
			}
			setFetch(true);
			alert.success("Jelölő sikeresen törölve!");
		}
	}

	if (showingInfo && Object.keys(selected).length > 0) {
		return (
			<InfoWindowF
				position={{ lat: selected.lat, lng: selected.lng }}
				onCloseClick={() => {
					setShowingInfo(false);
				}}
			>
				<div className="info-window">
					<h2>{selected.sport}</h2>
					<p>{selected.time.start + " - " + selected.time.end}</p>
					<div>
						<button name={"chat"} onClick={() => window.open(selectedUser, "_blank") }>
							Chat
						</button>
						{myMarker && (
							<button name={"delete"} onClick={lc_removeMarker}>
								Törlés
							</button>
						)}
					</div>
				</div>
			</InfoWindowF>
		);
	}
}

