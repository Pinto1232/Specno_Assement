import { useState } from "react";
import styles from "./AddOfficeForm.module.css";
import { AddOfficeFormProps } from "./Office.types";

const AddOfficeForm: React.FC<AddOfficeFormProps> = ({ onAddOffice }) => {
  const [office, setOffice] = useState({
    id: "",
    name: "",
    location: "",
    occupants: "",
    email: "",
    telephone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffice({ ...office, [e.target.name]: e.target.value });
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    office.id = generateUniqueId();
    onAddOffice(office);
    setOffice({
      id: "",
      name: "",
      location: "",
      occupants: "",
      email: "",
      telephone: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        name="name"
        value={office.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className={styles.inputName}
      />
      <input
        name="location"
        value={office.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className={styles.inputName}
      />
      <input
        name="occupants"
        value={office.occupants}
        onChange={handleChange}
        placeholder="Occupants"
        required
        className={styles.inputName}
      />
      <input
        name="email"
        value={office.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className={styles.inputName}
      />

      <input
        name="telephone"
        value={office.telephone}
        onChange={handleChange}
        placeholder="Telephone"
        required
        className={styles.inputName}
      />
      <button
        type="submit"
        className={styles.btnAddOffice}
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
        Add
      </button>
    </form>
  );
};

export default AddOfficeForm;
