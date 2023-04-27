import "../assets/style/profile/user.css"
import "../assets/style/profile/useredit.css"
import React, { useState, useEffect, useContext } from 'react'
import Profile from "../components/profile/Profile"
import Nav from '../components/Nav';
import FetchProfile from "../services/FetchProfile"
import ProfileEditing from '../components/profile/ProfileEditing';
import { HookContext, UserContext } from "../context/Context";


function UserPage() {
  const {alert} = useContext(HookContext);
  const [profileInfo, setProfileInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    FetchProfile({setProfileInfo, alert})
  }, [isEditing, alert])

  return (
    <div className="back-profile-page">
      <div>
        <Nav />
        <UserContext.Provider value={{ profileInfo, setIsEditing }} >
        <div className='profile-page w-10/12 lg:w-4/12'>
          <h1>Profil</h1>
          { isEditing ? <ProfileEditing /> : <Profile /> }
        </div>
        </UserContext.Provider>
      </div>
    </div>
  )
}

export default UserPage