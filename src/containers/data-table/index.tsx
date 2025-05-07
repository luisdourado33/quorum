/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table";
import { cx } from "@/lib/utils";
import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowUpSLine,
  RiBubbleChartLine,
} from "@remixicon/react";

const TextButton = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      className="group rounded-md bg-white p-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:bg-gray-950 dark:ring-gray-800 hover:dark:bg-gray-900 disabled:hover:dark:bg-gray-950"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const NumberButton = ({
  active,
  onClick,
  children,
  position,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  position?: "left" | "right";
}) => {
  return (
    <button
      type="button"
      className={cx(
        "min-w-[36px] rounded-md p-2 text-sm text-gray-900 disabled:opacity-50 dark:text-gray-50",
        active
          ? "bg-white font-bold dark:bg-gray-950"
          : "hover:bg-gray-50 hover:dark:bg-gray-950",
        position === "left"
          ? "rounded-l-md"
          : position === "right"
          ? "rounded-r-md"
          : ""
      )}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </button>
  );
};

const MobileButton = ({
  onClick,
  disabled,
  children,
  position,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  position?: "left" | "right";
}) => {
  return (
    <button
      type="button"
      className={cx(
        "group p-2 text-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:ring-gray-800 hover:dark:bg-gray-900 disabled:hover:dark:bg-gray-950",
        position === "left"
          ? "rounded-l-md"
          : position === "right"
          ? "-ml-px rounded-r-md"
          : ""
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default function DataTable<T>({
  data = [],
  columns = [],
  pageSize = 5,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  });

  const paginationCount = table.getPageCount();
  const actualPage = table.getState().pagination.pageIndex + 1;

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center gap-x-2 py-10">
        <RiBubbleChartLine />
        <p className="text-gray-500 dark:text-gray-400">
          No data available for this table.
        </p>
      </div>
    );
  }

  return (
    <>
      <TableRoot className="w-full">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  const sortingHandler =
                    header.column.getToggleSortingHandler?.();

                  const getAriaSortValue = (
                    isSorted: false | SortDirection
                  ) => {
                    switch (isSorted) {
                      case "asc":
                        return "ascending";
                      case "desc":
                        return "descending";
                      case false:
                      default:
                        return "none";
                    }
                  };

                  return (
                    <TableHeaderCell
                      key={header.id}
                      onClick={sortingHandler}
                      onKeyDown={(event: any) => {
                        if (event.key === "Enter" && sortingHandler) {
                          sortingHandler(event);
                        }
                      }}
                      className={cx(
                        header.column.getCanSort() &&
                          "cursor-pointer select-none"
                      )}
                      tabIndex={header.column.getCanSort() ? 0 : -1}
                      aria-sort={getAriaSortValue(header.column.getIsSorted())}
                    >
                      <div
                        className={cx(
                          header.column.columnDef.enableSorting === true
                            ? "flex items-center justify-between gap-2 hover:bg-gray-50 hover:dark:bg-gray-900"
                            : header.column.columnDef.meta?.align,
                          "rounded-md px-1.5 py-1.5"
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() ? (
                          <div className="-space-y-2">
                            <RiArrowUpSLine
                              className={cx(
                                "size-4 text-gray-900 dark:text-gray-50",
                                header.column.getIsSorted() === "desc"
                                  ? "opacity-30"
                                  : ""
                              )}
                              aria-hidden={true}
                            />
                            <RiArrowDownSLine
                              className={cx(
                                "size-4 text-gray-900 dark:text-gray-50",
                                header.column.getIsSorted() === "asc"
                                  ? "opacity-30"
                                  : ""
                              )}
                              aria-hidden={true}
                            />
                          </div>
                        ) : null}
                      </div>
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell
                    key={cell.id}
                    className={cx([
                      cell.column.columnDef.meta?.align,
                      "border-b border-gray-200 dark:border-gray-600",
                    ])}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
      <div className="mt-10 flex items-center justify-between sm:justify-center">
        {/* long pagination button form only for desktop view */}
        <div className="hidden gap-0.5 sm:inline-flex">
          <TextButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous</span>
            <RiArrowLeftSLine
              className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </TextButton>
          <NumberButton
            onClick={() => table.setPageIndex(0)}
            active={actualPage === 1}
          >
            1
          </NumberButton>
          {actualPage > 4 ? (
            actualPage < paginationCount - 2 ? (
              <>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage - 3)}
                  active={false}
                >
                  ...
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage - 2)}
                  active={actualPage === actualPage - 1}
                >
                  {actualPage - 1}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage - 1)}
                  active={true}
                >
                  {actualPage}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage)}
                  active={actualPage === actualPage + 1}
                >
                  {actualPage + 1}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage + 1)}
                  active={false}
                >
                  ...
                </NumberButton>
              </>
            ) : (
              <>
                <NumberButton
                  onClick={() => table.setPageIndex(1)}
                  active={false}
                >
                  2
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(paginationCount - 5)}
                  active={false}
                >
                  ...
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(paginationCount - 4)}
                  active={actualPage === paginationCount - 3}
                >
                  {paginationCount - 3}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(paginationCount - 3)}
                  active={actualPage === paginationCount - 2}
                >
                  {paginationCount - 2}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(paginationCount - 2)}
                  active={actualPage === paginationCount - 1}
                >
                  {paginationCount - 1}
                </NumberButton>
              </>
            )
          ) : (
            <>
              <NumberButton
                onClick={() => table.setPageIndex(1)}
                active={actualPage === 2}
              >
                2
              </NumberButton>
              <NumberButton
                onClick={() => table.setPageIndex(2)}
                active={actualPage === 3}
              >
                3
              </NumberButton>
              <NumberButton
                onClick={() => table.setPageIndex(3)}
                active={actualPage === 4}
              >
                4
              </NumberButton>
              <NumberButton
                onClick={() => table.setPageIndex(4)}
                active={false}
              >
                ...
              </NumberButton>
              <NumberButton
                onClick={() => table.setPageIndex(paginationCount - 2)}
                active={false}
              >
                {paginationCount - 1}
              </NumberButton>
            </>
          )}
          <NumberButton
            onClick={() => table.setPageIndex(paginationCount - 1)}
            active={actualPage === paginationCount}
          >
            {paginationCount}
          </NumberButton>
          <TextButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Next</span>
            <RiArrowRightSLine
              className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </TextButton>
        </div>
        <p className="text-sm tabular-nums text-gray-500 dark:text-gray-500 sm:hidden">
          Página{" "}
          <span className="font-medium text-gray-900 dark:text-gray-50">{`${
            table.getState().pagination.pageIndex + 1
          }`}</span>{" "}
          de
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {" "}
            {`${table.getPageCount()}`}
          </span>
        </p>
        {/*  */}
        <div className="inline-flex items-center rounded-md shadow-sm sm:hidden">
          <MobileButton
            position="left"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous</span>
            <RiArrowLeftSLine
              className="size-5 text-gray-700 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </MobileButton>
          <MobileButton
            position="right"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Next</span>
            <RiArrowRightSLine
              className="size-5 text-gray-700 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </MobileButton>
        </div>
      </div>
    </>
  );
}
