import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Row,
  Col,
  CardBody,
} from 'reactstrap';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const generatePageButtons = (current, total, maxVisible = 10) => {
  const pages = [];

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const siblingCount = 2;
  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total - 2);

  const shouldShowLeftEllipsis = leftSiblingIndex > 1;
  const shouldShowRightEllipsis = rightSiblingIndex < total - 2;

  pages.push(0); 

  if (shouldShowLeftEllipsis) {
    pages.push('start-ellipsis');
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    pages.push(i);
  }

  if (shouldShowRightEllipsis) {
    pages.push('end-ellipsis');
  }

  pages.push(total - 1); 

  return pages;
};



const PaginatedTable = ({
  data,
  columns,
  pageIndex,
  pageSize,
  pageCount,
  totalItems,
  loading,
  onPageChange,
  onPageSizeChange,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
}) => {
  const [expandedEllipsis, setExpandedEllipsis] = useState(null);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;

    return data.filter(row =>
      Object.values(row).some(
        val =>
          val &&
          val
            .toString()
            .toLowerCase()
            .includes(globalFilter.toLowerCase())
      )
    );
  }, [data, globalFilter]);

  const pageNumbers = useMemo(() => {
    if (expandedEllipsis === 'start') {
      const start = Math.max(0, pageIndex - 5);
      return Array.from({ length: 10 }, (_, i) => start + i).filter(p => p < pageCount);
    }
    if (expandedEllipsis === 'end') {
      const start = Math.max(pageCount - 10, 0);
      return Array.from({ length: 10 }, (_, i) => start + i);
    }

    return generatePageButtons(pageIndex, pageCount);
  }, [pageIndex, pageCount, expandedEllipsis]);

  const handleEllipsisClick = (type) => {
    setExpandedEllipsis(type);
  };

  const handlePageClick = (i) => {
    setExpandedEllipsis(null);
    onPageChange(i);
  };

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank
    }); on
    return itemRank.passed;
  };

  const table = useReactTable({
    data: filteredData,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      columnFilters,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const Filter = ({
    column,
    // table
  }) => {
    const columnFilterValue = column.getFilterValue();

    return (
      <>
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? '')}
          onChange={(event) => column.setFilterValue(event.target.value)}
          placeholder="Search..."
          className="w-36 border shadow rounded"
          list={column.id + 'list'}
        />
        <div className="h-1" />
      </>
    );
  };

  const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [debounce, onChange, value]);

    return (
      <input
        {...props}
        value={value}
        id="search-bar-0"
        className="form-control search"
        onChange={(e) => setValue(e.target.value)}
      />
    );
  };
  return (
    <div>
      <Row className="mb-3">
        <CardBody className="border border-dashed border-end-0 border-start-0">
          <form>
            <Row>
              <Col sm={5}>
                <div className={"search-box me-2 mb-2 d-inline-block"}>
                  <DebouncedInput
                    value={globalFilter ?? ''}
                    onChange={value => setGlobalFilter((value))}
                    placeholder={SearchPlaceholder}
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </Col>

            </Row>
          </form>
        </CardBody>
      </Row>
      <Table hover className={tableClass}>
        <thead className='theadClass'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr className={trClass} key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className={thClass} key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {!loading && table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No data found</td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <span>
            Showing {pageIndex * pageSize + 1} -{' '}
            {Math.min((pageIndex + 1) * pageSize, totalItems)} of {totalItems}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Pagination>
            <PaginationItem disabled={pageIndex === 0}>
              <PaginationLink previous onClick={() => handlePageClick(pageIndex - 1)} />
            </PaginationItem>

            {pageNumbers.map((page, index) =>
              typeof page === 'string' ? (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => handleEllipsisClick(page.includes('start') ? 'start' : 'end')}>
                    ...
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem active={page === pageIndex} key={page}>
                  <PaginationLink onClick={() => handlePageClick(page)}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem disabled={pageIndex >= pageCount - 1}>
              <PaginationLink next onClick={() => handlePageClick(pageIndex + 1)} />
            </PaginationItem>
          </Pagination>

          <Input
            type="select"
            value={pageSize}
            onChange={(e) => {
              setExpandedEllipsis(null);
              onPageSizeChange(Number(e.target.value));
            }}
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </Input>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default PaginatedTable;
