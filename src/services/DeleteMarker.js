
async function DeleteMarker({selected, alert}) {
	const response = await fetch(`${process.env.REACT_APP_IP}/marker/delete`, {
	  method: "DELETE",
	  crossDomain: true,
	  headers: {
		 "Content-Type": "application/json",
		 Accept: "application/json",
		 "Access-Control-Allow-Origin": "*",
	  },
	  body: JSON.stringify({
		 token: window.localStorage.getItem("token"),
		 selected,
	  }),
	});
	if (!response.ok) {
	  alert.error("Marker törlése sikertelen");
	  return;
	}
 }

export default DeleteMarker