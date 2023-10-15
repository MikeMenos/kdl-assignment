import { type PropsWithChildren, type ReactElement } from "react";

import type { TableToolbarProps } from "../../../interfaces";
import AddButton from "../buttons/AddButton";
import Input from "../Input";
import { BiSearch } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";

function Toolbar<T extends Record<string, unknown>>({
  onAdd,
  handleFilterInputChange,
  setGlobalFilter,
  filterValue,
  setFilterValue,
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  const clearFilterInput = () => {
    setFilterValue("");
    setGlobalFilter("");
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        {onAdd && <AddButton className="text-lg" onClick={onAdd} />}
        <div className="flex items-center">
          <Input
            value={filterValue}
            placeholder="Search..."
            onChange={handleFilterInputChange}
            className="rounded-xl bg-secondary py-3 pr-5 pl-7 outline-none"
            icon={<BiSearch size="1.1rem" />}
            closeIcon={<RiCloseFill size="1.1rem" onClick={clearFilterInput} />}
          />
        </div>
      </div>
    </>
  );
}

export default Toolbar;
