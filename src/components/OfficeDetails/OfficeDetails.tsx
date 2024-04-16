import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Employee {
  id: string;
  name: string;
}

interface Office {
  name: string;
  location: string;
  occupants: number;
  employees: Employee[];
}

const OfficeDetails: React.FC = () => {
  const { officeId } = useParams<{ officeId: string }>();
  const [office, setOffice] = useState<Office | null>(null);

  useEffect(() => {
    const fetchOfficeDetails = async () => {
      if (!officeId) {
        console.error("Office ID is undefined");
        return;
      }
      const fetchedOffice: Office = await fetchOfficeById(officeId);
      setOffice(fetchedOffice);
    };

    fetchOfficeDetails();
  }, [officeId]);

  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {office && (
        <>
          <h2
            style={{
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
          {/* Add more details here */}
        </>
      )}

      <ul>
        {office &&
          office.employees.map((employee) => (
            <li key={employee.id}>{employee.name}</li>
          ))}
      </ul>
    </div>
  );
};

async function fetchOfficeById(officeId: string): Promise<Office> {
  const response = await fetch(`/api/offices/${officeId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch office details");
  }
  const office: Office = await response.json();
  return office;
}

export default OfficeDetails;
