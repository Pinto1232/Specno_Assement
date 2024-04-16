import React from 'react';
import { Office } from './Office.types';

interface OfficeListProps {
  offices: Office[];
  onViewDetails: (office: Office) => void;
}

const OfficeList: React.FC<OfficeListProps> = ({ offices, onViewDetails }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {offices.map((office) => (
        <div key={office.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h2 style={{ color: '#333' }}>{office.name}</h2>
          <p>{office.summary}</p>
          <p>Number of Staff: {office.occupants.length}</p>
          <button onClick={() => onViewDetails(office)}>View Details</button>
        </div>
      ))}
    </div>
  );
};

export default OfficeList;
