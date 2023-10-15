import { type ReactElement, type ChangeEvent, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import type { TableProps } from "../../../interfaces";
import Pagination from "./Pagination";
import ToolBar from "./Toolbar";

function Table<T extends object>({
  columns,
  data,
  toolbarEnabled = true,
  onAdd,
  dataSliced = false,
  name,
}: TableProps<T>): ReactElement {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<T>(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["id"],
        pageIndex: 0,
      },
    },
    useGlobalFilter,
    usePagination
  );

  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setGlobalFilter(value);
    setFilterValue(value);
  };
  return (
    <>
      <div className="flex flex-grow flex-col">
        {toolbarEnabled && (
          <ToolBar
            {...{ onAdd, handleFilterInputChange }}
            setGlobalFilter={setGlobalFilter}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        )}

        <table {...getTableProps({ className: "mt-8" })}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr
                {...headerGroup.getHeaderGroupProps({
                  className: "bg-purple",
                })}
                key={i}
              >
                {headerGroup.headers.map((column, x) => (
                  <th
                    {...column.getHeaderProps({
                      style: { padding: "1rem 0 1rem 0" },
                    })}
                    key={x}
                  >
                    {column.render("Header")}
                    {/* Render the columns filter UI */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps({ className: "hover:bg-secondary" })}
                  key={i}
                >
                  {row.cells.map((cell, x) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          style: {
                            textAlign: "center",
                            padding: "1rem 0 1rem 0",
                          },
                        })}
                        key={x}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="my-40 text-center">
          <h3>No Data Available</h3>
        </div>
      )}
      {!dataSliced && name !== "categories-table" && (
        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          pageOptions={pageOptions}
          pageCount={pageCount}
          nextPage={nextPage}
          previousPage={previousPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          dataLength={data.length}
        />
      )}
    </>
  );
}
export default Table;
