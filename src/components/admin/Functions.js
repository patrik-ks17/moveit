import SetUserType from "../../services/SetUserType";
import EditUser from "../../services/EditUser";
import DeleteUser from "../../services/DeleteUser";

export function AddAdmin({alert, clickedUser, setIsPending}) {
	const usertype = "admin";
	SetUserType({alert, clickedUser, usertype, setIsPending});
}

export function RemoveAdmin({alert, clickedUser, setIsPending}) {
	const usertype = "user";
	SetUserType({alert, clickedUser, usertype, setIsPending})
}

export function EditingUser ({alert, clickedUser, editedData, setIsPending}) {
	EditUser({alert, clickedUser, editedData, setIsPending})
}

export function DeletingUser({alert, clickedUser, setIsPending}) {
	if (window.confirm("Biztosan ki akarja törölni a felhasználót?")) {
		DeleteUser({alert, clickedUser, setIsPending});
	}
}