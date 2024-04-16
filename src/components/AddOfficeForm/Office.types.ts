export interface Office {
  id: string;
  name: string;
  summary: string;
  occupants: Occupant[];
}

export interface Occupant {
  id: string;
  name: string;
  role: string;
}
