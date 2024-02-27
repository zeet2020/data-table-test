import TableRow from "./TableRow";
import React from "react";

//pure component collection component handle rendering of row items component
export const TABLE_ROW_TEST_ID = "table-row-test-id";

function TableRowCollection({ rows, rowChecked, selectedRows }) {
  return (
    <tbody>
      {rows && rows.length === 0 && (
        <tr>
          <td colSpan={4}>No rows data available</td>
        </tr>
      )}
      {rows &&
        rows.length > 0 &&
        rows.map((item) => {
          return (
            <tr
              key={item.id}
              data-testid={TABLE_ROW_TEST_ID}
              className={selectedRows[item.id] ? "selected" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows[item.id]}
                  onChange={(event) =>
                    rowChecked(item.id, event.target.checked)
                  }
                />
              </td>
              <TableRow data={item} />
            </tr>
          );
        })}
    </tbody>
  );
}

export default React.memo(TableRowCollection);
