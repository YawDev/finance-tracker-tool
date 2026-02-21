import { useState } from "react";
import type { IPagination } from "../utils/Types";

const SelectItemsPerPage = ({
  paginationData,
  setPaginationData,
}: {
  paginationData: IPagination;
  setPaginationData: (paginationData: IPagination) => void;
}) => {
  const { itemsPerPage } = paginationData;

  const [selectedValue, setSelectedValue] = useState<number>(itemsPerPage);

  const dropDownValues: number[] = [2, 4, 5, 10, 15, 20, 25];

  const handleSelectChange = (value: number) => {
    setSelectedValue(value);
    setPaginationData({
      ...paginationData,
      itemsPerPage: value,
      currentPage: 1,
    });
  };

  return (
    <div className="items-per-page-selector">
      <label htmlFor="items-per-page-select">Items Per Page: </label>
      <select
        id="items-per-page"
        value={selectedValue}
        onChange={(e) =>
          handleSelectChange(e.target.value as unknown as number)
        }
        className="items-per-page-select"
      >
        {dropDownValues.map((dropDownItem, index) => (
          <option key={index} value={dropDownItem}>
            {dropDownItem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectItemsPerPage;
