async function EditProfile({newProfileInfo, alert}) {
	const response = await fetch(`${process.env.REACT_APP_IP}/profile/edit`, {
	  method: "PUT",
	  crossDomain: true,
	  headers: {
		 "Content-Type": "application/json",
		 Accept: "application/json",
		 "Access-Control-Allow-Origin": "*",
	  },
	  body: JSON.stringify({
		 token: window.localStorage.getItem("token"),
		 profileInfo: newProfileInfo,
	  }),
	});
	if (!response.ok) {
	  alert.error("Profil adatok szerkesztése sikertelen");
	  return;
	}
 }
 
 export default EditProfile;
 