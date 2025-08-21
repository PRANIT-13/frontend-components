import React, { useMemo, useState } from 'react';
import clsx from 'clsx';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

type Order = 'asc' | 'desc';
interface SortState<T> {
  key: keyof T | null;
  order: Order;
}

function compareValues(a: unknown, b: unknown) {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

const headerCellBase =
  'px-3 py-2 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-200 select-none';

function sortIcon(order?: Order) {
  return (
    <svg className="ml-1 inline h-3.5 w-3.5 align-middle" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M7 13l3 3 3-3M7 7l3-3 3 3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity={order ? 1 : 0.35}
      />
    </svg>
  );
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [sort, setSort] = useState<SortState<T>>({ key: null, order: 'asc' });
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const sortedData = useMemo(() => {
    if (!sort.key) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const cmp = compareValues(a[sort.key!], b[sort.key!]);
      return sort.order === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [data, sort]);

  const allSelected = selectable && data.length > 0 && selected.size === data.length;

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSort((prev) => {
      if (prev.key === col.dataIndex) {
        return { key: prev.key, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { key: col.dataIndex, order: 'asc' };
    });
  };

  const toggleAll = () => {
    if (!selectable) return;
    if (allSelected) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const s = new Set<number>(sortedData.map((_, i) => i));
      setSelected(s);
      onRowSelect?.(sortedData);
    }
  };

  const toggleRow = (i: number) => {
    if (!selectable) return;
    const s = new Set(selected);
    if (s.has(i)) s.delete(i);
    else s.add(i);
    setSelected(s);
    onRowSelect?.(Array.from(s).map((idx) => sortedData[idx]));
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-950">
  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800" role="table">
    <thead className="bg-zinc-100 dark:bg-zinc-900 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-200 uppercase tracking-wide">
      <tr role="row">
        {selectable && (
          <th className={clsx(headerCellBase, 'w-10')} role="columnheader">
            <input
              type="checkbox"
              role="checkbox"
              aria-label={allSelected ? 'Deselect all rows' : 'Select all rows'}
              checked={allSelected}
              onChange={toggleAll}
              className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
            />
          </th>
        )}
        {columns.map((col) => {
          const isSorted = sort.key === col.dataIndex;
          const ariaSort = isSorted ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none';
          return (
            <th
              key={col.key}
              scope="col"
              aria-sort={ariaSort as React.AriaAttributes['aria-sort']}
              className={clsx(headerCellBase, col.sortable && 'cursor-pointer select-none')}
              onClick={() => toggleSort(col)}
              role="columnheader"
            >
              <span className="inline-flex items-center gap-1">
                {col.title}
                {col.sortable && sortIcon(isSorted ? sort.order : undefined)}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>

    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
      {loading ? (
        [...Array(5)].map((_, r) => (
          <tr key={`s-${r}`} className="animate-pulse" role="row">
            {selectable && (
              <td className="px-3 py-2" role="cell">
                <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-800" />
              </td>
            )}
            {columns.map((c) => (
              <td key={`s-${c.key}`} className="px-4 py-3" role="cell">
                <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
              </td>
            ))}
          </tr>
        ))
      ) : sortedData.length === 0 ? (
        <tr role="row">
          <td
            className="px-4 py-6 text-center text-sm text-zinc-500"
            colSpan={columns.length + (selectable ? 1 : 0)}
            role="cell"
          >
            No data to display
          </td>
        </tr>
      ) : (
        sortedData.map((row, i) => (
          <tr
            key={row.id ?? i}
            className={clsx(
              i % 2 === 0 ? "bg-white dark:bg-zinc-950" : "bg-zinc-50 dark:bg-zinc-900",
              "hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors duration-150"
            )}
            aria-selected={selectable ? selected.has(i) : undefined}
            role="row"
          >
            {selectable && (
              <td className="px-3 py-2" role="cell">
                <input
                  type="checkbox"
                  role="checkbox"
                  aria-label={`Select row ${i + 1}`}
                  className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
                  checked={selected.has(i)}
                  onChange={() => toggleRow(i)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={`${col.key}-${i}`} className="px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200" role="cell">
                {String(row[col.dataIndex] ?? '')}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
  );
};

export default DataTable;
