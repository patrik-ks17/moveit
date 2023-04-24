import React, { useContext } from 'react'
import { AdminContext } from '../../context/Context'


function ManageUser() {
	const {Users, Editing, handleChange, handleClick} = useContext(AdminContext)
	return (
		<table className="admin_user-data">
			<thead>
				<tr>
					<th>#</th>
					<th>Felh. név</th>
					<th>Email Cím</th>
					<th>Nick név</th>
					<th>Foglalkozás</th>
					<th>Leírás</th>
					<th>Rang</th>
					<th>Módosítás</th>
					<th>Törlés</th>
				</tr>
			</thead>
			{Users && Users.map((user, i) => (
				<tbody key={i}>
					<tr>
						<td className='p_picture'><img src={user.profile.profilePicture} alt='profile avatar' /></td>
						<td>{user.username}</td>
						<td>{user.email}</td>
						{Editing === user.email ?
							<>
								<td className='!p-1'>
									<input type="text" name={"nickname"} defaultValue={user.profile.nickname} onChange={handleChange} />
								</td>
								<td className='!p-1'>
									<input type="text" name={"profession"} defaultValue={user.profile.profession} onChange={handleChange} />
								</td>
								<td className='!p-1'>
									<textarea className='info'
										cols="30"
										rows="10"
										name={"info"}
										defaultValue={user.profile.info}
										onChange={handleChange}
									/>
								</td>
							</> :
							<>
								<td>{user.profile.nickname}</td>
								<td>{user.profile.profession}</td>
								<td><div className='info'>{user.profile.info}</div></td>
							</>
						}
						<td>
							{user.usertype === "user" ?
								<img src={"icon/func/add-admin.png"} alt='add-admin' useremail={user.email} name={"AddAdmin"} onClick={e => handleClick(e)} />
								:
								<img src={"icon/func/remove-admin.png"} alt='remove-admin' useremail={user.email} name={"RemoveAdmin"} onClick={e => handleClick(e)} />
							}
						</td>
						{Editing === user.email ?
							<>
								<td>
									<img src={"icon/func/confirm.png"} alt='confirm' useremail={user.email} name={'ConfirmEdit'} onClick={e => handleClick(e)} />
								</td>
							</> :
							<>
								<td>
									<img src={"icon/func/edit.png"} alt='edit' useremail={user.email} name={'EditUser'} onClick={e => handleClick(e)} />
								</td>
							</>
						}
						<td>
							<img src={"icon/func/delete-user.png"} alt='delete-user' useremail={user.email} name={'DeleteUser'} onClick={e => handleClick(e)} />
						</td>
					</tr>
				</tbody>
			))}
		</table>
	)
}

export default ManageUser