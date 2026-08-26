import { BsSearch } from "react-icons/bs";

import type { TSearchBar } from "../../types/ui";
import "../../styles/ui/searchbar.scss";

const SearchBar = ({ placeholder, value, onChangeFn }: TSearchBar) => {
  return (
    <div className="search-group">
      <div className="search-field">
        <div className="search-wrapper">
          <BsSearch size={20} className="icon" />
          <input
            value={value}
            onChange={(e) => onChangeFn(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
