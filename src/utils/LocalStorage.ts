export const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  const result = localStorage.getItem(key);

  return result ? JSON.parse(result) : null;
};
