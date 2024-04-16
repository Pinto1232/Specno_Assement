import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddOfficeForm from "../components/AddOfficeForm/AddOfficeForm";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

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
      <style>
        {`
          @media (min-width: 768px) {
            .grid-container {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
          }
          @media (min-width: 1024px) {
            .grid-container {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          gap: "20px",
        }}
      >
        {showAddOfficeForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <AddOfficeForm onAddOffice={addOffice} />
              <button
                onClick={() => setShowAddOfficeForm(false)}
                style={{ position: "absolute", top: 0, right: 10 }}
              >
                <IoClose />
              </button>
            </div>
          </div>
        )}
        <div
          className="grid-container"
          style={{ width: "100%", padding: "0 20px", boxSizing: "border-box" }}
        >
          {offices.map((office, index) => (
            <div
              key={index}
              style={{
                background: "#FFFFFF",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textDecoration: "none",
                color: "inherit",
                borderLeftColor: getBorderColor(index),
                borderLeftStyle: "solid",
                borderLeftWidth: "10px",
              }}
            >
              <Link
                to={`/office/${index}`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    borderBottom: "1px solid #E1E1E1",
                    paddingBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    <span>{office.name}</span>
                    <img
                      src="../src/assets/Edit.png"
                      alt="Edit Icon"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "10px",
                      }}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setShowAddOfficeForm(true);
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="../src/assets/People.png"
                      alt="New Icon"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    <span style={{ marginRight: "8px", fontWeight: "bold" }}>
                      {office.occupants}
                    </span>
                    Staff members in the office
                  </div>
                </div>
              </Link>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={(event) => toggleDetails(index, event)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
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
                  <p style={{ color: "#666", fontSize: "14px" }}>
                    Location: {office.location}
                  </p>
                  <p style={{ color: "#666", fontSize: "14px" }}>
                    Occupants: {office.occupants}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
