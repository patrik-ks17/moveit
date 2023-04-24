import React,  { useRef, useContext } from 'react'
import EditProfile from "../../services/EditProfile"
import { UserContext } from '../../context/Context';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';



function ProfileEditing() {
  const {profileInfo, setIsEditing} = useContext(UserContext);
  const {register, handleSubmit} = useForm();
  const alert = useAlert()

  const onSubmit = async(data) => { 
    const newProfileInfo = {
      profilePicture: profilePicture.current != null ? profilePicture.current : profileInfo.profilePicture,
      nickname: data.nickname,
      profession: data.profession,
      info: data.info,
      social: {
        tiktok: data.tiktok,
        twitter: data.twitter,
        instagram: data.instagram,
        facebook: data.facebook,
        linkedin: data.linkedin
      }
    }
    await EditProfile({newProfileInfo, alert});
    setIsEditing(false);
  }

  const profilePicture = useRef(null);
  function covertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      profilePicture.current = reader.result
    }
    reader.onerror = error => { 
      console.log("Error: ", error)
    }
  }
  
  return (
	 <div className="profile-edit">
    <div>
      <img src="icon/func/exit.png" className="edit-btn" onClick={() => setIsEditing(false)}></img>
      <h1>Profil Szerkesztés</h1>
      <form 
        className='edit-profile-form' 
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="picture">Profilkép:</label>
        <input type="file" name="picture" accept=".jpg,.jpeg,.png" onChange={covertToBase64}/>
        <label htmlFor="nickname">Nickname:</label>
        <input type="text" 
          name="nickname" 
          defaultValue={profileInfo.nickname} 
          {...register("nickname")} 
        />
        <label htmlFor="prof">Foglalkozás:</label>
        <input type="text" 
          name="prof" 
          defaultValue={profileInfo.profession}
          {...register("profession")}
        />
        <label htmlFor="info">Leírás:</label>
        <textarea name="info" 
          cols="30" 
          rows="4" 
          defaultValue={profileInfo.info}
          {...register("info")}
        ></textarea>
        <div className='edit-social'>
          <h2>Social média linkek</h2>
          <label htmlFor="tiktok">Tiktok:</label>
          <input type="text" 
            name="tiktok" 
            defaultValue={profileInfo.social['tiktok']}
            {...register("tiktok")}
          />
          <label htmlFor="twitter">Twitter:</label>
          <input type="text" 
            name="twitter" 
            defaultValue={profileInfo.social['twitter']}
            {...register("twitter")}
          />
          <label htmlFor="instagram">instagram:</label>
          <input type="text" 
            name="instagram" 
            defaultValue={profileInfo.social['instagram']}
            {...register("instagram")}
          />
          <label htmlFor="facebook">Facebook:</label>
          <input type="text" 
            name="facebook" 
            defaultValue={profileInfo.social['facebook']}
            {...register("facebook")}
          />
          <label htmlFor="linkedin">Likedin:</label>
          <input type="text" 
            name="linkedin" 
            defaultValue={profileInfo.social['linkedin']}
            {...register("linkedin")}
          />
        </div>
        <input type='submit' className='submit-btn' value={"Módosítás"}/>
      </form>
    </div>
   </div>
  )
}

export default ProfileEditing