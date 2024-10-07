import React from 'react';

interface TableProps {
  columns: string[];
  data: any[];
  actions?: React.ReactNode; // Optional actions (like edit, delete)
}

const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
  return (
    <div className="w-full h-full">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-2 px-4 bg-gray-50 border-b text-left text-gray-600 font-semibold"
              >
                {col}
              </th>
            ))}
            {actions && <th className="py-2 px-4 bg-gray-50 border-b text-left text-gray-600 font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-2 px-4 text-gray-600">
                  {row[col]}
                </td>
              ))}
              {actions && <td className="py-2 px-4">{actions}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
