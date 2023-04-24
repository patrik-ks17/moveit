async function DeleteUser({alert, clickedUser, setIsPending}) {
	const response = await fetch(`${process.env.REACT_APP_IP}/user/delete`, {
		method: "DELETE",
		crossDomain: true,
		headers: {
		  "Content-Type": "application/json",
		  Accept: "application/json",
		  "Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify({
		  token: window.localStorage.getItem("token"),
		  clickedUser: clickedUser
		}),
	 });
	 if (!response.ok) {
		alert.error("Felhasználó törlése sikertelen!");
		return;
	 } else {
		 alert.success("Felhasználó törölve!");
		 setIsPending(true)
		 return;
	  }
}

export default DeleteUser