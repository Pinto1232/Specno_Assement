export interface Office {
  id: string;
  name?: string;
  summary?: string;
  occupants?: Occupant[];
  email?: string;
  telephone?: string;
}

export interface Occupant {
  id: string;
  name?: string;
  role?: string;
}

export interface AddOfficeFormProps {
  onAddOffice: (office: {
    id: string;
    name?: string;
    location?: string;
    occupants?: string;
    email?: string;
    telephone?: string;
  }) => void;
  
}

