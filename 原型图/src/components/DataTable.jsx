import RiskTag from "./RiskTag.jsx";
import StatusTag from "./StatusTag.jsx";

export default function DataTable({ columns, rows, onRowClick }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} onClick={() => onRowClick?.(row)}>
              {columns.map((column) => (
                <td key={column.key}>{renderCell(column, row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderCell(column, row) {
  if (column.type === "risk") {
    return <RiskTag value={row[column.key]} />;
  }

  if (column.type === "status") {
    return <StatusTag value={row[column.key]} />;
  }

  if (column.render) {
    return column.render(row);
  }

  return row[column.key];
}
