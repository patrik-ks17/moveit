import React, { useState, useEffect } from 'react'
import FetchUsers from '../../services/FetchUsers';
import {AddAdmin, RemoveAdmin, EditingUser, DeletingUser} from './Functions';
import { AdminContext, HookContext } from './../../context/Context';
import ManageUser from './ManageUser';

function Admin() {
  const {alert} = useContext(HookContext)
  const [Users, setUsers] = useState()
  const [Editing, setIsEditing] = useState('')
  const [editedData, setEditedData] = useState(null)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    FetchUsers({setUsers, alert})
    setIsPending(false)
  }, [isPending, alert])

  function handleClick(e) {
    e.preventDefault()
    const clickedUser = e.target.getAttribute('useremail')
    switch (e.target.name) {
      case "AddAdmin": 
        AddAdmin({alert, clickedUser, setIsPending})
        break;
      case "RemoveAdmin":
        RemoveAdmin({alert, clickedUser, setIsPending})
        break;
      case "EditUser":
        setIsEditing(clickedUser)
        break;
      case "ConfirmEdit":
        setIsEditing('')
        EditingUser({alert, clickedUser, editedData, setIsPending})
        setEditedData(null)
        break;
      case "DeleteUser":
        DeletingUser({alert, clickedUser, setIsPending})
        break;
      default: 
      break;
    }
  }

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setEditedData( prev => {
      return prev === null ? {[key]: value} : 
      {...prev, [key]: value};
    })
  }

  return (
    <div className='admin-panel'>
      <AdminContext.Provider value={{Users, Editing, handleChange, handleClick}}>
        <ManageUser />
      </AdminContext.Provider>
    </div>
  )
}

export default Admin