export interface OfficeFormValues {
  "Office Name"?: string;
  "Physical address"?: string;
  "Email Address"?: string;
  "Phone Number"?: string;
  "Maximum Capacity"?: string;
}

export interface OfficeFormProps {
  initialValues: OfficeFormValues;
  onValuesChange: (values: OfficeFormValues) => void;
}
