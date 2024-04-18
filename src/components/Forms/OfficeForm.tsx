import React, { useState } from "react";
import styles from './OfficeForm.module.css';
import { OfficeFormValues, OfficeFormProps} from './OfficeForm.types'


const OfficeForm: React.FC<OfficeFormProps> = ({ initialValues, onSubmit }) => {
  const [formValues, setFormValues] = useState<OfficeFormValues>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "capacity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.formContainer}
    >
      {Object.entries(formValues).map(([key, value]) => (
        <div key={key}>
          <input
            type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
            name={key}
            id={key}
            value={value as string | number}
            onChange={handleChange}
            placeholder={`Enter ${key}`}
            className={styles.formInput}
          />
        </div>
      ))}
    </form>
  );
};

export default OfficeForm;
