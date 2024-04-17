import React, { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import styles from "./OfficeDetails.module.css";
import icons from "../../assets/Mask.png";
import iconsTwo from "../../assets/Mask Group 2.png";
import iconsThree from "../../assets/Mask Group 3.png";
import iconsFour from "../../assets/Mask Group 4.png";
import iconsFive from "../../assets/Mask Group 6.png";
import iconsSix from "../../assets/Mask Group 7.png";

interface User {
  name: string;
  surname: string;
  imageIcon: string;
}

interface OfficeDetailsProps {
  occupants: string;
}

const OfficeDetails: React.FC<OfficeDetailsProps> = ({ occupants }) => {
  const [users, setUsers] = useState<User[]>([
    { name: "Alexander", surname: "Hamilton", imageIcon: icons },
    { name: "Elizabeth", surname: "Schuyler", imageIcon: iconsTwo },
    { name: "Theodore", surname: "Roosevelt", imageIcon: iconsThree },
    { name: "Katherine", surname: "Johnson", imageIcon: iconsFour },
    { name: "Benjamin", surname: "Franklin", imageIcon: iconsFive },
    { name: "Margaret", surname: "Hamilton", imageIcon: iconsSix },
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const displayOccupants = occupants || "N/A";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddOrUpdateUser = (user: User) => {
    const index = users.findIndex((u) => u.name === user.name);
    if (index !== -1) {
      const updatedUsers = [...users];
      updatedUsers[index] = user;
      setUsers(updatedUsers);
    } else {
      setUsers([...users, user]);
    }
    setIsModalOpen(false);
  };


  const handleDeleteUser = () => {
    if (currentUser) {
      setUsers(users.filter((user) => user.name !== currentUser.name));
      setIsModalOpen(false);
    }
  };

  const openModal = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  console.log("Rendering OfficeDetails for:", occupants);

  const Modal = () => (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setIsModalOpen(false)}>
          &times;
        </span>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input
              type="text"
              value={currentUser?.name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser!, name: e.target.value })
              }
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              value={currentUser?.surname || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser!, surname: e.target.value })
              }
            />
          </label>
          <button
            type="button"
            onClick={() => handleAddOrUpdateUser(currentUser!)}
          >
            Save
          </button>
          <button type="button" onClick={handleDeleteUser}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className={styles["office-details-container"]}>
       <h3 className={styles["office-details-title"]}>
        {`Staff members in office ${displayOccupants}`}
      </h3>
      <div className={styles["office-details-grid"]}>
        {users.map((user, index) => (
          <div key={index} className={styles["office-details-card"]}>
            <img
              src={user.imageIcon}
              alt={`${user.name} ${user.surname}`}
              className={styles["office-details-image"]}
            />
            <p className={styles["office-details-name"]}>
              {user.name} {user.surname}
            </p>
            <p className={styles["office-details-name"]}>
              <MdMoreVert
                style={{ cursor: "pointer" }}
                onClick={() => openModal(user)}
              />
            </p>
          </div>
        ))}
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
};

export default OfficeDetails;
