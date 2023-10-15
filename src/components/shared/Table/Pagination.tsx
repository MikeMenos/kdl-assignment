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
  dataLength,
}) => {
  return (
    <>
      <div className="mx-auto mt-12 flex items-center md:gap-6 gap-2">
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
            {"< "}
          </Button>{" "}
          <Button
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {" >"}
          </Button>{" "}
        </div>
        <Button
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          Last
        </Button>{" "}
        <select
          className="rounded-md px-2 py-1 font-semibold text-black"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, dataLength].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="text-black">
              Show {pageSize === dataLength ? "All" : pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 text-center">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
    </>
  );
};

export default Pagination;
