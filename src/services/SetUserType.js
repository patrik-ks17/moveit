async function SetUserType({alert, clickedUser, usertype, setIsPending}){
	const response = await fetch(`${process.env.REACT_APP_IP}/user/usertype`, {
	  method: "PUT",
	  crossDomain: true,
	  headers: {
		 "Content-Type": "application/json",
		 Accept: "application/json",
		 "Access-Control-Allow-Origin": "*",
	  },
	  body: JSON.stringify({
		 token: window.localStorage.getItem("token"),
		 clickedUser: clickedUser,
		 setUsertype: usertype 
	  }),
	});
	if (!response.ok) {
		alert.error("Felhasználó rang módosítása sikertelen!");
		return;
	} else {
		alert.success("Felhasználó rangja módosítva!");
		setIsPending(true);
		return;
	 }
 }

export default SetUserType