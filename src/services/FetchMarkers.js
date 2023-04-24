async function FetchMarkers({setMarkers, alert}) {
  fetch(`${process.env.REACT_APP_IP}/marker/get`, {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      token: window.localStorage.getItem("token"),
    }),
  })
    .then((response) =>
      !response.ok ? alert.error("Sikertelen lekérdezés") : response.json()
    )
    .then((resp) => {
      if (resp.data === 'token expired') {
        alert.info("token lejárt, jelentkezz be újra!");
        window.localStorage.removeItem("token");
        window.localStorage.setItem("loggedIn", false);
      }
      else {
        setMarkers(resp.data);
      }
      
    });
}

export default FetchMarkers;
