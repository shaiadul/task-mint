import React from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { AccountValues } from "@/types/Types";

interface FormProps {
  values: AccountValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountInformationForm: React.FC<FormProps> = ({ values, handleChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save changes:", values);
  };

  return (
    <div className="p-4 sm:p-8 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Account Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" name="firstName" value={values.firstName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" value={values.lastName} onChange={handleChange} />
        </div>

        <InputField label="Email" name="email" type="email" value={values.email} onChange={handleChange} />
        <InputField label="Address" name="address" value={values.address} onChange={handleChange} />
        <InputField label="Contact Number" name="contactNumber" value={values.contactNumber} onChange={handleChange} />
        <InputField label="Birthday" name="birthday" type="date" value={values.birthday} onChange={handleChange} />

        <div className="flex space-x-4 pt-4">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="secondary">Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AccountInformationForm;
