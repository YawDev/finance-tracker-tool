export type NumberFormField = {
  value: string;
  error: string | null;
};

export type TextFormField = {
  value: string;
  error: string | null;
};

export type FormState = {
  Untouched: boolean;
  formInput: {
    name: TextFormField;
    description: TextFormField;
    amount: NumberFormField;
    date: TextFormField; // or Date depending on your needs
    type: TextFormField;
  };
};
