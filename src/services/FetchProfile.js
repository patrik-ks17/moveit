async function FetchProfile({setProfileInfo, alert}) {
	const response = await fetch(`${process.env.REACT_APP_IP}/profile/get`, {
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
	});
	if (!response.ok) {
	  alert.error("Sikertelen adat lekérdezés");
	  return;
	}
	const json = await response.json();
	if (json.data==='token expired') {
		alert.info("token lejárt, jelentkezz be újra!");
		window.localStorage.removeItem("token");
		window.localStorage.setItem("loggedIn", false);
		
	}
	else {
		setProfileInfo(json.data);
	}
 }

export default FetchProfile