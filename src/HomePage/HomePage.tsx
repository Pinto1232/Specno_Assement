import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddOfficeForm from "../components/AddOfficeForm/AddOfficeForm";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from "./HomePage.module.css";

interface Office {
  name: string;
  location: string;
  occupants: string;
}

const HomePage = () => {
  const [offices, setOffices] = useState<Office[]>(() => {
    const savedOffices = localStorage.getItem("offices");
    return savedOffices ? JSON.parse(savedOffices) : [];
  });
  const [showAddOfficeForm, setShowAddOfficeForm] = useState(false);
  const [detailsVisibility, setDetailsVisibility] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    localStorage.setItem("offices", JSON.stringify(offices));
  }, [offices]);

  const addOffice = (office: Office) => {
    setOffices((prevOffices) => [...prevOffices, office]);
    setShowAddOfficeForm(false);
  };

  const getBorderColor = (index: number) => {
    const colors = ["red", "blue", "green", "purple"];
    return colors[index % colors.length];
  };

  const toggleDetails = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setDetailsVisibility((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {showAddOfficeForm && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContent}>
            <AddOfficeForm onAddOffice={addOffice} />
            <button
              onClick={() => setShowAddOfficeForm(false)}
              className={styles.closeButton}
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}
      <div className={styles.gridContainer}>
        {offices.map((office, index) => (
          <div
            key={index}
            className={styles.officeCard}
            style={{
              borderLeftColor: getBorderColor(index),
              borderLeftStyle: "solid",
              borderLeftWidth: "10px",
            }}
          >
            <Link to={`/office/${index}`} className={styles.officeLink}>
              <div className={styles.officeHeader}>
                <div className={styles.blockOffice}>
                  <span>{office.name}</span>
                  <img
                    src="../src/assets/Edit.png"
                    alt="Edit Icon"
                    className={styles.editIcon}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setShowAddOfficeForm(true);
                    }}
                  />
                </div>
                <div className={styles.officeDetails}>
                  <img
                    src="../src/assets/People.png"
                    alt="New Icon"
                    className={styles.peopleIcon}
                  />
                  <span className={styles.occupants}>{office.occupants}</span>
                  <span className={styles.staff}>
                    Staff members in the office
                  </span>
                </div>
              </div>
            </Link>
            <div className={styles.detailButtonContainer}>
              <button
                onClick={(event) => toggleDetails(index, event)}
                className={styles.detailButton}
              >
                More info
                {detailsVisibility[index] ? (
                  <FaChevronUp fontSize={12} />
                ) : (
                  <FaChevronDown fontSize={12} />
                )}
              </button>
            </div>
            {detailsVisibility[index] && (
              <>
                <p className={styles.detailText}>Location: {office.location}</p>
                <p className={styles.detailText}>
                  Occupants: {office.occupants}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
