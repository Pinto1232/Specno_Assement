import React, { useCallback, useState } from "react";
import styles from "./OfficeForm.module.css";
import { OfficeFormValues, OfficeFormProps } from "./OfficeForm.types";

const OfficeForm: React.FC<OfficeFormProps> = ({
  initialValues,
  onValuesChange,
}) => {
  const [formValues, setFormValues] = useState<OfficeFormValues>(initialValues);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => {
      const newFormValues = { ...prevValues, [name]: value };
      if (onValuesChange) {
        onValuesChange(newFormValues);
      }
      return newFormValues;
    });
  }, [onValuesChange]);  // Removed formValues from dependencies

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log("Form submission successful");
  };
  
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
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