import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddOfficeForm from "../components/AddOfficeForm/AddOfficeForm";

interface Office {
  name: string;
  location: string;
  occupants: string;
}

const HomePage = () => {
  // Initialize state from localStorage if available, otherwise use default list
  const [offices, setOffices] = useState<Office[]>(() => {
    const savedOffices = localStorage.getItem("offices");
    return savedOffices
      ? JSON.parse(savedOffices)
      : [
          {
            name: "Office 1",
            location: "San Francisco",
            occupants: "10 employees",
          },
          { name: "Office 2", location: "New York", occupants: "15 employees" },
        ];
  });
  const [showAddOfficeForm, setShowAddOfficeForm] = useState(false);

  // Effect to save offices to localStorage when they change
  useEffect(() => {
    localStorage.setItem("offices", JSON.stringify(offices));
  }, [offices]);

  const addOffice = (office: Office) => {
    setOffices((prevOffices) => [...prevOffices, office]);
    setShowAddOfficeForm(false);
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
          minHeight: "100vh",
          gap: "20px",
        }}
      >
        <button
          onClick={() => setShowAddOfficeForm(true)}
          style={{
            padding: "12px",
            background: "linear-gradient(to right, #38a169, #2f855a)",
            color: "white",
            borderRadius: "0.375rem",
            outline: "none",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transition: "background-color 200ms ease-in-out",
          }}
        >
          Add Office
        </button>
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
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div
          className="grid-container"
          style={{ width: "100%", padding: "0 20px", boxSizing: "border-box" }}
        >
          {offices.map((office, index) => (
            <Link
              key={index}
              to={`/office/${index}`}
              style={{
                background: "#FFFFFF",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#333",
                  borderBottom: "1px solid #E1E1E1",
                  paddingBottom: "10px",
                }}
              >
                {office.name}
              </h2>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Location: {office.location}
              </p>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Occupants: {office.occupants}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
