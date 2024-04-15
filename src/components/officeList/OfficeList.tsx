// src/components/OfficeList.tsx
import React from 'react';
import { Office } from './Office.types';

interface OfficeListProps {
 offices: Office[];
}

const OfficeList: React.FC<OfficeListProps> = ({ offices }) => {
 return (
    <div>
      {offices.map((office) => (
        <div key={office.id}>
          <h2>{office.name}</h2>
          <p>{office.summary}</p>
          <ul>
            {office.occupants.map((occupant) => (
              <li key={occupant.id}>{occupant.name} - {occupant.role}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
 );
};

export default OfficeList;