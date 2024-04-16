import { useState } from "react";

interface AddOfficeFormProps {
  onAddOffice: (office: {
    name: string;
    location: string;
    occupants: string;
  }) => void;
}

const AddOfficeForm: React.FC<AddOfficeFormProps> = ({ onAddOffice }) => {
  const [office, setOffice] = useState({
    name: "",
    location: "",
    occupants: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffice({ ...office, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddOffice(office);
    setOffice({ name: "", location: "", occupants: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        name="name"
        value={office.name}
        onChange={handleChange}
        placeholder="Office Name"
        required
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        name="location"
        value={office.location}
        onChange={handleChange}
        placeholder="Location"
        required
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        name="occupants"
        value={office.occupants}
        onChange={handleChange}
        placeholder="Occupants"
        required
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
        Add Office
      </button>
    </form>
  );
};

export default AddOfficeForm;
