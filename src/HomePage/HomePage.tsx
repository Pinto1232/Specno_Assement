import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddOfficeForm from "../components/AddOfficeForm/AddOfficeForm";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import styles from "./HomePage.module.css";
import OfficeDetails from "../components/OfficeDetails/OfficeDetails";
import { Button } from "@nextui-org/react";
import SearchBar from "../components/SearchBar/SearchBar";
import { Office } from "./HomePage.types";

const HomePage: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>(() => {
    const savedOffices = localStorage.getItem("offices");
    return savedOffices ? JSON.parse(savedOffices) : [];
  });
  const [showAddOfficeForm, setShowAddOfficeForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const [detailsVisibility, setDetailsVisibility] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    localStorage.setItem("offices", JSON.stringify(offices));
  }, [offices]);

  const addOffice = (office: Office) => {
    setOffices((prevOffices) => [
      ...prevOffices,
      {
        ...office,
        email: office.email,
        telephone: office.telephone,
        occupants: office.occupants,
      },
    ]);
    setShowAddOfficeForm(false);
  };

  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized to:", window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getBorderColor = (index: number) => {
    const colors = [
      "rgba(255, 155, 113, 1)",
      "rgba(255, 0, 110, 1)",
      "rgba(251, 86, 7, 1)",
      "rgba(169, 240, 209, 1)",
      "rgba(151, 81, 44, 1)",
      "rgba(72, 157, 218, 1)",
      "rgba(131, 56, 236, 1)",
    ];
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

  useEffect(() => {
    console.log("Offices updated:", offices);
  }, [offices]);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.buttonCreateOffice}>
        <Button
          className={styles.btnOffice}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setShowAddOfficeForm(true);
          }}
        >
          Create Office
        </Button>
      </div>
      {showAddOfficeForm && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContent}>
            <div className={styles.headingIcons}>
              <div>
                <IoCloseCircle onClick={() => setShowAddOfficeForm(false)} />
              </div>
              <div>
                <h3 className={styles.headinText}>Add Office</h3>
              </div>
            </div>
            <AddOfficeForm onAddOffice={addOffice} />
            <button
              onClick={() => setShowAddOfficeForm(false)}
              className={styles.closeButton}
            ></button>
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
                  <span className={styles.txtOffice}>{office.name}</span>
                  <img
                    src="../../../public/assets/Edit.png"
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
                    src="../../../public/assets/People.png"
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
                  <FaChevronDown className={styles.btnIcons} />
                )}
              </button>
            </div>
            {detailsVisibility[index] && (
              <>
                <p className={styles.detailText}>
                  <img
                    src="../../../public/assets/Phone.png"
                    alt="Location Icon"
                    className={styles.locationIcon}
                  />
                  Telefone {office.telephone}
                </p>
                <p className={styles.detailText}>
                  <img
                    src="../../../public/assets/email.png"
                    alt="Location Icon"
                    className={styles.locationIcon}
                  />
                  Email {office.email}
                </p>
                <p className={styles.detailText}>
                  <img
                    src="../../../public/assets/People_2.png"
                    alt="Location Icon"
                    className={styles.locationIcon}
                  />
                  {office.location}
                </p>
                <p className={styles.detailText}>
                  <img
                    src="../../../public/assets/location.png"
                    alt="Location Icon"
                    className={styles.accupants}
                  />
                  Office Capacity: {office.occupants}
                </p>
              </>
            )}
            <div className={styles.hideOnLarge}>
              <SearchBar onSearch={handleSearch} />
            </div>
            {isMobile && office.occupants && (
              <OfficeDetails
                occupants={office.occupants ?? "N/A"}
                searchTerm={searchTerm}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
