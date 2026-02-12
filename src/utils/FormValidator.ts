type ValidationResult = {
  isValid?: boolean;
  errorMessage?: string;
};

  export const validateField = (field : any , value : string | number) : ValidationResult => {

        if(field === "amount")
        {
            return validateAmount(value as string);
        }
        
        return {
            isValid: !!value,
            errorMessage: value ? "" : `${field} is required`,
          };
  }

  const validateAmount = (value : string) : ValidationResult => {

    const numberRegex = /^\d+(\.\d{1,2})?$/; // Matches numbers with up to 2 decimal places

     if (!numberRegex.test(value.toString())) {
      return { isValid: false, errorMessage: "Amount must be a valid number with up to 2 decimal places" };
    }

    const numValue = parseFloat(value.toString());

    if (numValue <= 0) {  
      return { isValid: false, errorMessage: "Amount must be greater than zero" };
    }

    return { isValid: true, errorMessage: "" };
}