async function EditUser({alert, clickedUser, editedData, setIsPending}) {
	const response = await fetch(`${process.env.REACT_APP_IP}/user/edit`, {
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
		 editedData: editedData
	  }),
	});
	if (!response.ok) {
	  alert.error("Felhasználói adatok módosítása sikertelen!");
	  return;
	} else {
		alert.success("Felhasználó adatai módosítva!");
		setIsPending(true)
		return;
	 }
 }
 
 export default EditUser;
 