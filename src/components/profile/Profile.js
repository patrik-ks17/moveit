import React, { useContext } from "react";
import { UserContext } from "../../context/Context";


function Profile() {
  const { profileInfo, setIsEditing } = useContext(UserContext);
  if (profileInfo === null) return "Loading..."
  return (
    <div data-testid="profile-details" className="profile-details">
      <div>
        <img className="profile-picture" src={profileInfo?.profilePicture} alt="" />
        <img src="icon/func/edit.png" alt='edit' className="edit-btn" onClick={() => setIsEditing(true)} />
        <span className="nickname">{profileInfo?.nickname}</span>
        <span className="prof">{profileInfo?.profession}</span>
        <p className="personal-info">{profileInfo?.info}</p>
      </div>
      <div className="social-links">
        <ul>
          <li>
            <a href={"https://tiktok.com/" + profileInfo?.social['tiktok']} target="_blank" rel="noreferrer">
              <img src="icon/social/tiktok.png"
                alt={profileInfo?.social['tiktok']}
                title={profileInfo?.social['tiktok']}
              />
            </a>
          </li>
          <li>
            <a href={"https://twitter.com/" + profileInfo?.social['twitter']} target="_blank" rel="noreferrer">
              <img src="icon/social/twitter.png"
                alt={profileInfo?.social['twitter']}
                title={profileInfo?.social['twitter']}
              />
            </a>
          </li>
          <li>
            <a href={"https://instagram.com/" + profileInfo?.social['instagram']} target="_blank" rel="noreferrer">
              <img src="icon/social/instagram.png"
                alt={profileInfo?.social['instagram']}
                title={profileInfo?.social['instagram']}
              />
            </a>
          </li>
          <li>
            <a href={"https://facebook.com/" + profileInfo?.social['facebook']} target="_blank" rel="noreferrer">
              <img src="icon/social/facebook.png"
                alt={profileInfo?.social['facebook']}
                title={profileInfo?.social['facebook']}
              />
            </a>
          </li>
          <li>
            <a href={"https://linkedin.com/" + profileInfo?.social['linkedin']} target="_blank" rel="noreferrer">
              <img src="icon/social/linkedin.png"
                alt={profileInfo?.social['linkedin']}
                title={profileInfo?.social['linkedin']}
              />
            </a>
          </li>
        </ul>
      </div>
    <h1>
      Kérlek add meg a facebook oldalad linkjét,
    </h1>
    <h1>a profilodhoz csatolva.</h1>
    <h1>Ezt használva tudsz majd a többiekkel kapcsolatba lépni.</h1>
    </div>
  );
}

export default Profile;
