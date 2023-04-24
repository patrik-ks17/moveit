async function PushMarker({selected, alert}) {
  const response = await fetch(`${process.env.REACT_APP_IP}/marker/add`, {
    method: "POST",
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
    alert.error("Marker hozzáadás sikertelen");
    return;
  }
}

export default PushMarker;
