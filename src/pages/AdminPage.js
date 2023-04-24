import "../assets/style/admin/admin.css"
import React, { useState, useEffect } from 'react'
import { UserContext } from "../context/Context";
import Nav from '../components/Nav'
import Admin from "../components/admin/Admin";
import Profile from "../components/profile/Profile";
import ProfileEditing from "../components/profile/ProfileEditing";
import FetchProfile from "../services/FetchProfile";

function AdminPage() {
  const [a_panel, setPanel] = useState(true);
  const [profileInfo, setProfileInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    FetchProfile({ setProfileInfo, alert })
  }, [isEditing])

  function switchPanel(e) {
    const curr_pnl = e.target.value;
    if (curr_pnl === "admin") setPanel(true);
    else if (curr_pnl === "profil") setPanel(false);
  }

  return (
    <div className='back-admin-page overflow-auto md:overflow-hidden'>
      <div className="overflow-auto">
        <Nav />
        <div id="rbtn" className="switch-panel" onChange={(e) => switchPanel(e)}>
          <input type="radio" id="rb1" name="rb" value="admin" />
          <label htmlFor="rb1">Admin</label>
          <input type="radio" id="rb2" name="rb" value="profil" />
          <label htmlFor="rb2">Profil</label>
        </div>
        <div id="admin-panels" className="w-11/12 md:w-8/12">
          <UserContext.Provider value={{ profileInfo, setIsEditing }} >
            {a_panel ? <Admin /> : <div className="profile-page w-10/12 lg:w-4/12 m-auto">
              {isEditing ?
                <ProfileEditing
                  profileInfo={profileInfo}
                  setIsEditing={setIsEditing}
                /> :
                <Profile
                  profileInfo={profileInfo}
                  setIsEditing={setIsEditing}
                />
              }
            </div>
            }
          </UserContext.Provider>
        </div>


      </div>
    </div>
  )
}

export default AdminPage