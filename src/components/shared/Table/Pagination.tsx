import { type FC } from "react";
import { type PaginationPropsInterface } from "../../../interfaces";
import Button from "../buttons/Button";

const Pagination: FC<PaginationPropsInterface> = ({
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageOptions,
  pageCount,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
}) => {
  return (
    <div className="mx-auto mt-12 flex items-center gap-6">
      <Button
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        First
      </Button>{" "}
      <div className="flex gap-4">
        <Button
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"< Previous"}
        </Button>{" "}
        <Button
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {"Next >"}
        </Button>{" "}
      </div>
      <Button
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        Last
      </Button>{" "}
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </span>
      <select
        className="rounded-md px-2 py-1 font-semibold text-black"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30].map((pageSize) => (
          <option key={pageSize} value={pageSize} className="text-black">
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
