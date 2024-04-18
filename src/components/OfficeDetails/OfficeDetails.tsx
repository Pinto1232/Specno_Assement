import React, { useCallback, useMemo, useState } from "react";
import { MdMoreVert } from "react-icons/md";
import icons from "../../assets/Mask.png";
import iconsTwo from "../../assets/Mask Group 2.png";
import iconsThree from "../../assets/Mask Group 3.png";
import iconsFour from "../../assets/Mask Group 4.png";
import iconsFive from "../../assets/Mask Group 6.png";
import iconsSix from "../../assets/Mask Group 7.png";
import styles from "./OfficeDetails.module.css";
import { IoAddCircle, IoArrowBack } from "react-icons/io5";
import { OfficeDetailsProps, User } from "././OfficeDetails.types";
import { BiArrowBack } from "react-icons/bi";
import OfficeForm from "../Forms/OfficeForm";
import { OfficeFormValues } from "../Forms/OfficeForm.types";
import { debounce } from "lodash";

const OfficeDetails: React.FC<OfficeDetailsProps> = ({
  occupants,
  searchTerm,
}) => {
  const [users] = useState<User[]>([
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
  const [offices, setOffices] = useState<OfficeFormValues[]>([]);

  const initialValues: OfficeFormValues = {
    "Office Name": "",
    "Physical address": "",
    "Email Address": "",
    "Phone Number": "",
    "Maximum Capacity": "",
  };
  

  const [formValues, setFormValues] = useState<OfficeFormValues>(initialValues);

  const debouncedFormValuesChange = useMemo(
    () =>
      debounce((values: OfficeFormValues) => {
        console.log("Updating form values:", values);
        setFormValues(values);
      }, 3300),
    [setFormValues]
  );

  const handleFormValuesChange = useCallback(debouncedFormValuesChange, [
    debouncedFormValuesChange,
  ]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form Values on Submit:", formValues);
    handleAddOffice(formValues);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Debug form auto reloading...");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOffice = (newOffice: OfficeFormValues) => {
    console.log("Adding new office:", newOffice);
    setOffices((prevOffices) => [...prevOffices, newOffice]);
    console.log("New offices state:", offices);
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

  const handleDotClick = useCallback((step: number) => {
    setModalStep(step);
  }, []);

  const renderDots = useCallback(() => {
    const totalSteps = 2;
    const dots = [];
    for (let i = 1; i <= totalSteps; i++) {
      dots.push(
        <span
          key={i}
          className={`${styles.dot} ${modalStep === i ? styles.activeDot : ""}`}
          onClick={() => handleDotClick(i)}
        >
          •
        </span>
      );
    }
    return <div className={styles.dotsContainer}>{dots}</div>;
  }, [modalStep, handleDotClick]);

  console.log("Current Modal Step:", modalStep);

  const colors = [
    "rgba(255, 190, 11, 1)",
    "rgba(255, 155, 113, 1)",
    "rgba(251, 86, 7, 1)",
    "rgba(251, 86, 7, 1)",
    "rgba(219, 186, 221, 1)",
    "rgba(255, 0, 110, 1)",
    "rgba(169, 240, 209, 1)",
    "rgba(0, 180, 2, 1)",
    "rgba(72, 157, 218, 1)",
    "rgba(0, 114, 232, 1)",
    "rgba(0, 114, 232, 1)",
  ];

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
                      <button
                        type="button"
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <IoAddCircle />
                      </button>
                      <h2 className={styles.headingText}>New Staff Member</h2>
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
                    {renderDots()}
                    <div className={styles.buttonContainer}>
                      <button
                        type="button"
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
                        type="button"
                        className={styles.closeButton}
                        onClick={() => setModalStep(3)}
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
                            ></div>
                          ))}
                        </div>
                      </label>
                    </div>
                    {renderDots()}
                    <div className={styles.buttonContainer}>
                      <button
                        type="button"
                        className={styles.nextButton}
                        onClick={() => {
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
                    <div className={styles.modalHeader}></div>
                    <div className={styles.buttonContainerStaff}>
                      <button
                        type="button"
                        className={styles.btnEditStaf}
                        onClick={() => setModalStep(1)}
                      >
                        Edit Staff Member
                      </button>
                      <button
                        type="button"
                        className={styles.btnDeleteStaff}
                        onClick={() => setModalStep(4)}
                      >
                        Delete Staff Member
                      </button>
                    </div>
                  </div>
                );
              case 4:
                return (
                  <div>
                    <div className={styles.DeleteOfficeHeader}>
                      <button
                        type="button"
                        className={styles.closeButtonLeft}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <BiArrowBack />
                      </button>
                      <h2 className={styles.headingText}>
                        Are you sure you want to delete Staff Member?
                      </h2>
                    </div>

                    <div className={styles.buttonContainerDeleteKeep}>
                      <button
                        className={styles.btnDeleteRed}
                        onClick={() => setModalStep(6)}
                      >
                        Delete Office
                      </button>
                      <button
                        type="button"
                        className={styles.btnKeepOffice}
                        onClick={() => setModalStep(3)}
                      >
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
                        type="button"
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
                      <button type="button" onClick={() => setModalStep(6)}>
                        Next
                      </button>
                    </div>
                  </div>
                );
              case 6:
                return (
                  <div>
                    <div className={styles.modalHeader}>
                      <div className={styles.EditStaffMember}>
                        <button
                          type="button"
                          className={styles.closeButton}
                          onClick={() => setIsModalOpen(false)}
                        >
                          <IoArrowBack />
                        </button>
                        <h2 className={styles.headingEditStaff}>
                          Edit Staff Member
                        </h2>
                      </div>
                      <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <IoAddCircle />
                      </button>
                    </div>
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
                            ></div>
                          ))}
                        </div>
                      </label>
                    </div>
                    {renderDots()}
                    <div className={styles.buttonContainer}>
                      <button
                        type="button"
                        className={styles.btnUpdateStaffMember}
                        onClick={() => {
                          setModalStep(7);
                        }}
                      >
                        Update Staff Member
                      </button>
                    </div>
                  </div>
                );
              case 7:
                return (
                  <div>
                    <div className={styles.OfficeHeaderContainer}>
                      <div className={styles.EditStaffMember}>
                        <button
                          className={styles.closeButton}
                          onClick={() => {
                            setModalStep(8);
                          }}
                        >
                          <IoArrowBack />
                        </button>
                        <h2 className={styles.headingEditStaff}>New Office</h2>
                      </div>
                    </div>
                    <OfficeForm
                      initialValues={initialValues}
                      onValuesChange={handleFormValuesChange}
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                        id="fileInput"
                      />
                      <h2 className={styles.headingText}>Office Color</h2>
                      <label htmlFor="fileInput">
                        <div className={styles.iconsContainer}>
                          {users.map((user, index) => (
                            <div
                              key={user.name}
                              className={styles.circularImages}
                              style={{
                                backgroundColor: colors[index % colors.length],
                              }}
                            ></div>
                          ))}
                        </div>
                      </label>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        type="button"
                        className={styles.btnUpdateStaffMember}
                        onClick={handleSubmit}
                      >
                        Add Office
                      </button>
                    </div>
                  </div>
                );
              case 8:
                return (
                  <div>
                    <div className={styles.OfficeHeaderContainer}>
                      <div className={styles.EditStaffMember}>
                        <button
                          className={styles.closeButton}
                          onClick={() => {
                            setModalStep(1);
                          }}
                        >
                          <IoArrowBack />
                        </button>
                        <h2 className={styles.headingEditStaff}>Edit Office</h2>
                      </div>
                    </div>
                    <OfficeForm
                      initialValues={initialValues}
                      onValuesChange={handleFormValuesChange}
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                        id="fileInput"
                      />
                      <h2 className={styles.headingText}>Office Color</h2>
                      <label htmlFor="fileInput">
                        <div className={styles.iconsContainer}>
                          {users.map((user, index) => (
                            <div
                              key={user.name}
                              className={styles.circularImages}
                              style={{
                                backgroundColor: colors[index % colors.length],
                              }}
                            ></div>
                          ))}
                        </div>
                      </label>
                    </div>
                    <div className={styles.buttonContainer8}>
                      <button
                        type="button"
                        className={styles.btnUpdateStaffMember}
                        /* onClick={handleSubmit} */
                      >
                        Update Office
                      </button>
                      <button
                        type="button"
                         className={styles.btnUpdateDeleteOffice} 
                      >
                        Delete Office
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
