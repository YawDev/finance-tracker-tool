import { useContext } from "react";
import AppContext from "../utils/Context";

const SearchBar = ({}: { keyword: string; handleOnChange: () => void }) => {
  const context = useContext(AppContext);

  return (
    <input
      type="text"
      value={context?.query || ""}
      onChange={(e) => context?.setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default SearchBar;
