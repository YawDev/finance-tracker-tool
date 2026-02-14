type ValidationResult = {
  isValid?: boolean;
  errorMessage?: string;
};

export const validateField = (
  field: any,
  value: string | number,
): ValidationResult => {
  if (field === "amount") {
    return validateAmount(value as string);
  }

  if (field === "name") {
    return validateName(value as string);
  }

  if (field === "description") {
    return validateDescription(value as string);
  }

  if (field === "date") {
    return validateDate(value as string);
  }

  if (field === "type") {
    return validateType(value as string);
  }

  return {
    isValid: !!value,
    errorMessage: value ? "" : `${field} is required`,
  };
};

const validateAmount = (value: string): ValidationResult => {
  const numberRegex = /^\d+(\.\d{1,2})?$/; // Matches numbers with up to 2 decimal places

  if (!numberRegex.test(value.toString())) {
    return {
      isValid: false,
      errorMessage: "Amount must be a valid number with up to 2 decimal places",
    };
  }

  const numValue = parseFloat(value.toString());

  if (numValue <= 0) {
    return { isValid: false, errorMessage: "Amount must be greater than zero" };
  }

  return { isValid: true, errorMessage: "" };
};

const validateName = (value: string): ValidationResult => {
  if (value.trim().length === 0 || value === null) {
    return { isValid: false, errorMessage: "Name is required" };
  }

  const nameRegex = /^[a-zA-Z\s]+$/; // Letters and spaces only
  if (!nameRegex.test(value)) {
    return {
      isValid: false,
      errorMessage: "Name can only contain letters, and spaces",
    };
  }

  return { isValid: true, errorMessage: "" };
};

const validateDescription = (value: string): ValidationResult => {
  const hasInput = value?.trim().length > 0;

  const descriptionRegex = /^[a-zA-Z\s]+$/; // Letters and spaces only
  if (hasInput && !descriptionRegex.test(value)) {
    return {
      isValid: false,
      errorMessage: "Description can only contain letters, and spaces",
    };
  }

  return { isValid: true, errorMessage: "" };
};

const validateDate = (value: string): ValidationResult => {
  // Add your date validation logic here
  // For example, you can check if the date is in a valid format or within a certain range

  if (value.trim().length === 0) {
    return { isValid: false, errorMessage: "Date is required" };
  }

  return { isValid: true, errorMessage: "" };
};

const validateType = (value: string): ValidationResult => {
  if (value.trim().length === 0) {
    return { isValid: false, errorMessage: "Transaction type is required" };
  }

  return { isValid: true, errorMessage: "" };
};
