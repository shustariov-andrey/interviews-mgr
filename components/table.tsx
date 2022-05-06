import React from 'react';

export interface TableProps<T extends object> {
  columns: Array<keyof T & string>;
  data: T[];
  headers: Partial<Record<keyof T, string>>;
  onRowClick?: (item: T, rowIndex: number) => void;
}

const Table = <T extends object, >({ data, headers, columns, onRowClick }: TableProps<T>) => {
  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map(col =>
            <th key={col} scope="col" className="px-6 py-3">
              {headers[col] ?? col}
            </th>
          )}
        </tr>
        </thead>
        <tbody>
        {
          data.map((item, rowIndex) =>
            <tr key={rowIndex}
                onClick={() => onRowClick?.(item, rowIndex)}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {columns.map((col, colIndex) =>
                colIndex === 0 ?
                  <td key={rowIndex.toString() + colIndex.toString()} scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {String(item[col])}
                  </td>
                  :
                  <td key={rowIndex.toString() + colIndex.toString()} className="px-6 py-4">
                    {String(item[col])}
                  </td>)
              }
            </tr>
          )
        }
        </tbody>
      </table>
    </>
  );
};

export default Table;
