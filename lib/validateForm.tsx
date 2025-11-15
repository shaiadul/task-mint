import { SignupValues, AuthErrors } from "@/types/Types";

export default function validateForm(values: SignupValues): AuthErrors {
  const errors: AuthErrors = {};

  // Name Validation
  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  }
  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  // Email Validation
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  // Password Validation
  if (!values.password.trim()) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password must include at least one uppercase letter";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(values.password)) {
    errors.password = "Password must include at least one special character";
  }

  // Confirm Password Validation
  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.confirmPassword!== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
