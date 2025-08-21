import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DataTable from '../components/DataTable';
import type { DataTableProps, Column } from '../components/DataTable';

type Person = { id: number; name: string; age: number; city: string };

const columns: Column<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'city', title: 'City', dataIndex: 'city', sortable: true },
];

const data: Person[] = [
  { id: 1, name: 'Aarav', age: 24, city: 'Pune' },
  { id: 2, name: 'Meera', age: 29, city: 'Mumbai' },
  { id: 3, name: 'Kabir', age: 21, city: 'Nagpur' },
  { id: 4, name: 'Zara', age: 26, city: 'Delhi' },
];

const meta: Meta<DataTableProps<Person>> = {
  title: 'Tables/DataTable',
  component: DataTable<Person>,
  args: { data, columns, loading: false, selectable: false },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<DataTableProps<Person>>;

export const Basic: Story = {};

export const Loading: Story = { args: { loading: true } };

export const Empty: Story = { args: { data: [] } };

export const Selectable: Story = {
  args: { selectable: true },
  render: (args) => {
    const [selected, setSelected] = useState<Person[]>([]);
    return (
      <div className="space-y-2">
        <DataTable<Person>
          {...args}
          onRowSelect={(rows) => setSelected(rows)}
        />
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Selected: {selected.map((r) => r.name).join(', ') || 'None'}
        </div>
      </div>
    );
  },
};
