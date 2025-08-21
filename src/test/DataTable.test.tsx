import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { afterEach, vi } from 'vitest';

type Row = { id: number; name: string; age: number };

const columns: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const data: Row[] = [
  { id: 1, name: 'C', age: 30 },
  { id: 2, name: 'A', age: 20 },
  { id: 3, name: 'B', age: 25 },
];

afterEach(() => cleanup());

it('sorts by column when header clicked', async () => {
  const user = userEvent.setup();
  render(<DataTable<Row> data={data} columns={columns} />);
  
  const nameHeader = screen.getByText('Name');
  await user.click(nameHeader);

  const cells = screen
    .getAllByRole('cell')
    .filter((_, i) => i % columns.length === 0); // first column only

  expect(cells.map((c) => c.textContent?.trim())).toEqual(['A', 'B', 'C']);
});

it('selects rows and calls callback', async () => {
  const user = userEvent.setup();
  const cb = vi.fn();

  render(<DataTable<Row> data={data} columns={columns} selectable onRowSelect={cb} />);
  const checkboxes = screen.getAllByRole('checkbox');

  await user.click(checkboxes[1]); // select first row
  expect(cb).toHaveBeenCalledWith([{ id: 1, name: 'C', age: 30 }]);
});

it('shows empty state when no data', () => {
  render(<DataTable<Row> data={[]} columns={columns} />);
  expect(screen.getByText('No data to display')).toBeInTheDocument();
});

it('shows loading skeletons', () => {
  render(<DataTable<Row> data={[]} columns={columns} loading />);
  expect(screen.getAllByRole('row')).not.toHaveLength(0);
});
