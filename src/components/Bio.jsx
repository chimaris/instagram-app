import { useState } from "react";
import getPhotoUrl from "get-photo-url";
import { db } from "../dexie";
import { useLiveQuery } from "dexie-react-hooks";
import profileIcon from "../assets/profileIcon.svg";

const Bio = () => {
	// const [defaultObjectData, setdefaultObjectData] = useState({
	// 	name: "Wendu Stellamaris",
	// 	about: "Highly motivated Web Developer with a big passion for internet and all related..",
	// });
	// const [profilePhoto, setProfilePhoto] = useState(profileIcon);

	const [editFormIsOpen, setEditFormIsOpen] = useState(false);

	// Setup Defualt Value
	const defaultObjectData = {
		name: "Wendu Stellamaris",
		about: "Highly motivated Web Developer with a big passion for internet and all related..",
	};

	// useEffect(() => {
	// 	const setDataFromDb = async () => {
	// 		// const userDatailsFromDb = await db.bio.get("info");
	// 		const profilePhotoFromDb = await db.bio.get("profilePhoto");
	// 		// userDatailsFromDb && setUserDetails(userDatailsFromDb);
	// 		profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb);
	// 	};

	// 	setDataFromDb();
	// });

	const profilePhotoFromDb = useLiveQuery(async () => await db.bio.get("profilePhoto"));
	const userDetails = useLiveQuery(async () => await db.bio.get("info"));
	// if (!userDetails) return null;

	const updateUserDetails = async (e) => {
		e.preventDefault();
		const objectData = {
			name: e.target.nameOfUser.value,
			about: e.target.aboutUser.value,
		};
		// setUserDetails(objectData)
		await db.bio.put(objectData, "info");

		setEditFormIsOpen(false);
	};

	const updatePhotoInput = async () => {
		const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
		db.bio.put(newProfilePhoto, "profilePhoto");
		// setProfilePhoto(newProfilePhoto);
	};

	const editForm = (
		<form className="edit-bio-form" onSubmit={updateUserDetails}>
			<input type="text" id="" name="nameOfUser" defaultValue={userDetails?.name} placeholder="Your name" />
			{/* <input type="text" id="" name="aboutUser" defaultValue={userDetails.about} placeholder="About you" /> */}
			<textarea
				name="aboutUser"
				id=""
				defaultValue={userDetails?.about}
				placeholder="About you"
				cols="30"
				rows="40"></textarea>
			<br />
			<button type="button" className="cancel-button" onClick={() => setEditFormIsOpen(false)}>
				Cancel
			</button>
			<button type="submit" className="save-button">
				Save
			</button>
		</form>
	);

	const editButton = <button onClick={() => setEditFormIsOpen(true)}>Edit</button>;

	return (
		<section className="bio">
			<input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
			<label htmlFor="profilePhotoInput" onClick={updatePhotoInput}>
				<div className="profile-photo" role="button" title="Click to edit photo">
					<img src={profilePhotoFromDb || profileIcon} alt="profile" />
				</div>
			</label>

			<div className="profile-info">
				<p className="name">{userDetails?.name || defaultObjectData.name}</p>
				<p className="about">{userDetails?.about || defaultObjectData.about}</p>

				{editFormIsOpen ? editForm : editButton}
			</div>
		</section>
	);
};

export default Bio;
