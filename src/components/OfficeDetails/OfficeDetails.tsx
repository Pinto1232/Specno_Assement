import React, { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import icons from "../../assets/Mask.png";
import iconsTwo from "../../assets/Mask Group 2.png";
import iconsThree from "../../assets/Mask Group 3.png";
import iconsFour from "../../assets/Mask Group 4.png";
import iconsFive from "../../assets/Mask Group 6.png";
import iconsSix from "../../assets/Mask Group 7.png";
import styles from "./OfficeDetails.module.css";
import { IoAddCircle } from "react-icons/io5";
import { OfficeDetailsProps, User } from "././OfficeDetails.types";

const OfficeDetails: React.FC<OfficeDetailsProps> = ({
  occupants,
  searchTerm,
}) => {
  const [users, setUsers] = useState<User[]>([
    { name: "Alexander", surname: "Hamilton", imageIcon: icons },
    { name: "Elizabeth", surname: "Schuyler", imageIcon: iconsTwo },
    { name: "Theodore", surname: "Roosevelt", imageIcon: iconsThree },
    { name: "Katherine", surname: "Johnson", imageIcon: iconsFour },
    { name: "Benjamin", surname: "Franklin", imageIcon: iconsFive },
    { name: "Margaret", surname: "Hamilton", imageIcon: iconsSix },
  ]);
  const [, setCurrentUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleAddOrUpdateUser = () => {
    if (editableUser) {
      const index = users.findIndex((u) => u.name === editableUser.name);
      if (index !== -1) {
        const updatedUsers = [...users];
        updatedUsers[index] = editableUser;
        setUsers(updatedUsers);
      } else {
        setUsers([...users, editableUser]);
      }
    }
    setIsModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (user: User) => {
    setCurrentUser(user);
    setEditableUser({ ...user });
    setModalStep(1);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm || "") ||
      user.surname?.toLowerCase().includes(searchTerm || "")
  );

  const MultiStepModal = () => {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          {(() => {
            switch (modalStep) {
              case 1:
                return (
                  <div>
                    <div className={styles.modalHeader}>
                      <h2 className={styles.headingText}>New Staff Member</h2>
                      <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <IoAddCircle />
                      </button>
                    </div>
                    <input
                      className={styles.inputFiel}
                      type="text"
                      placeholder="Name"
                      value={editableUser?.name || ""}
                      onChange={(e) =>
                        setEditableUser({
                          ...editableUser!,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      className={styles.inputFiel}
                      type="text"
                      placeholder="Surname"
                      value={editableUser?.surname || ""}
                      onChange={(e) =>
                        setEditableUser({
                          ...editableUser!,
                          surname: e.target.value,
                        })
                      }
                    />
                    <div className={styles.buttonContainer}>
                      <button
                        className={styles.nextButton}
                        onClick={() => setModalStep(2)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                );
              case 2:
                return (
                  <div>
                    <div className={styles.modalHeader}>
                      <h2 className={styles.headingText}>New Staff Member</h2>
                      <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <IoAddCircle />
                      </button>
                    </div>
                    <h2 className={styles.headingText}>Avatar</h2>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                        id="fileInput"
                      />
                      <label htmlFor="fileInput">
                        <div className={styles.iconsContainer}>
                          {users.map((user, index) => (
                            <div
                              key={index}
                              className={styles.circularImage}
                              style={{
                                backgroundImage: `url(${
                                  image ||
                                  user.imageIcon ||
                                  "/path/to/default/image.png"
                                })`,
                              }}
                            >
                              
                            </div>
                          ))}
                        </div>
                      </label>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        className={styles.nextButton}
                        onClick={() => {
                          handleAddOrUpdateUser();
                          setModalStep(3);
                        }}
                      >
                        Add Staff Member
                      </button>
                    </div>
                  </div>
                );
              case 3:
                return (
                  <div>
                    <div className={styles.modalHeader}>
                      <h2 className={styles.headingText}>
                        Edit or Delete User
                      </h2>
                      <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <IoAddCircle />
                      </button>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button onClick={() => setModalStep(4)}>Edit User</button>
                      <button onClick={() => setModalStep(5)}>
                        Delete User
                      </button>
                    </div>
                  </div>
                );
              case 4:
                return (
                  <div>
                    <div className={styles.modalHeader}>
                      <h2>Confirm Action</h2>
                      <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <IoAddCircle />
                      </button>
                    </div>
                    <p>
                      Are you sure you want to delete or keep the existing
                      office?
                    </p>
                    <div className={styles.buttonContainer}>
                      <button onClick={() => setModalStep(6)}>
                        Delete Office
                      </button>
                      <button onClick={() => setIsModalOpen(false)}>
                        Keep Office
                      </button>
                    </div>
                  </div>
                );
              case 5:
                return (
                  <div>
                    <div className={styles.modalHeader}>
                      <h2>Edit User</h2>
                      <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <IoAddCircle />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Edit Name"
                      value={editableUser?.name || ""}
                      onChange={(e) =>
                        setEditableUser({
                          ...editableUser!,
                          name: e.target.value,
                        })
                      }
                    />
                    <div className={styles.buttonContainer}>
                      <button onClick={() => setModalStep(6)}>Next</button>
                    </div>
                  </div>
                );
              case 6:
                return (
                  <div>
                    <div className={styles.modalHeader}>
                      <h2>Update ImageIcon</h2>
                      <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <IoAddCircle />
                      </button>
                    </div>
                    <input type="file" onChange={handleImageChange} />
                    <div className={styles.buttonContainer}>
                      <button onClick={handleAddOrUpdateUser}>
                        Update User
                      </button>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  };

  return (
    <div className={styles["office-details-container"]}>
      <div>
        <h3
          className={styles.staffMember}
        >{`Staff members in office ${occupants}`}</h3>
      </div>
      <div className={styles["office-details-grid"]}>
        {filteredUsers.map((user, index) => (
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
      {isModalOpen && <MultiStepModal />}
    </div>
  );
};

export default OfficeDetails;
