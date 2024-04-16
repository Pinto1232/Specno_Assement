import { useState } from "react";
import { Link } from 'react-router-dom';
import AddOfficeForm from "../components/AddOfficeForm/AddOfficeForm";

interface Office {
  name: string;
  location: string;
  occupants: string;
}

const HomePage = () => {
  const [offices, setOffices] = useState<Office[]>([
    { name: "Office 1", location: "San Francisco", occupants: "10 employees" },
    { name: "Office 2", location: "New York", occupants: "15 employees" },
  ]);

  const addOffice = (office: Office) => {
    setOffices([...offices, office]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '20px' }}>
      <AddOfficeForm onAddOffice={addOffice} />
      {offices.map((office, index) => (
        <Link key={index} to={`/office/${index}`} style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '320px', textDecoration: 'none', color: 'inherit' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #E1E1E1', paddingBottom: '10px' }}>{office.name}</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>Location: {office.location}</p>
          <p style={{ color: '#666', fontSize: '14px' }}>Occupants: {office.occupants}</p>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
