import { useState } from "react";

interface AddOfficeFormProps {
  onAddOffice: (office: {
    name: string;
    location: string;
    occupants: string;
    email: string;
    telephone: string;
  }) => void;
}

const AddOfficeForm: React.FC<AddOfficeFormProps> = ({ onAddOffice }) => {
  const [office, setOffice] = useState({
    name: "",
    location: "",
    occupants: "",
    email: "",
    telephone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffice({ ...office, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddOffice(office);
    setOffice({
      name: "",
      location: "",
      occupants: "",
      email: "",
      telephone: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg"
    >
      <input
        name="name"
        value={office.name}
        onChange={handleChange}
        placeholder="Office Name"
        required
        className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <input
        name="location"
        value={office.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <input
        name="occupants"
        value={office.occupants}
        onChange={handleChange}
        placeholder="Occupants"
        required
        className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <input
        name="email"
        value={office.email}
        onChange={handleChange}
        placeholder="email"
        required
        className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />

      <input
        name="telephone"
        value={office.telephone}
        onChange={handleChange}
        placeholder="telephone"
        required
        className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <button
        type="submit"
        style={{
          padding: "12px",
          background: "linear-gradient(to right, #38a169, #2f855a)",
          color: "white",
          borderRadius: "0.375rem",
          outline: "none",
          transition: "background-color 200ms ease-in-out",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(to right, #2f855a, #276749)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(to right, #38a169, #2f855a)";
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.5)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow =
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        }}
      >
        Add Office
      </button>
    </form>
  );
};

export default AddOfficeForm;
