import { useState } from "react";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

type Person = { id: number; name: string; age: number; city: string };

const columns: { key: string; title: string; dataIndex: keyof Person; sortable: boolean }[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "city", title: "City", dataIndex: "city", sortable: true },
];

const initialData: Person[] = [
  { id: 1, name: "Aarav", age: 24, city: "Pune" },
  { id: 2, name: "Meera", age: 29, city: "Mumbai" },
  { id: 3, name: "Kabir", age: 21, city: "Nagpur" },
  { id: 4, name: "Zara", age: 26, city: "Delhi" },
];

export default function App() {
  const [filter, setFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<Person[]>([]);

  // filter data by name
  const filteredData = initialData.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        Frontend Components Demo
      </h1>

      {/* Search input */}
      <InputField
        label="Search by name"
        placeholder="Type a name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        helperText={`Showing ${filteredData.length} result(s)`}
        variant="outlined"
      />

      {/* DataTable */}
      <DataTable<Person>
        data={filteredData}
        columns={columns}
        selectable
        onRowSelect={(rows) => setSelectedRows(rows)}
      />

      {/* Selected summary */}
      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        Selected: {selectedRows.map((r) => r.name).join(", ") || "None"}
      </div>
    </div>
  );
}
