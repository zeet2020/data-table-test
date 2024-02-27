import React from "react";
import TableHeader from "./TableHeader";
import TableRowCollection from "./TableRowCollection";

function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random_no = (Math.random() * 16) | 0;
    let value = char == "x" ? random_no : (random_no & 0x3) | 0x8;
    return value.toString(16);
  });
}

export const DATA_TABLE_TEST_ID = "data-table-test-id";

export const SELECT_ALL_TEST_ID = "select-all-test-id";

// container pattern component which hold most part of logic of tables, which provide more control of data changes
// and  state changes

export default function TableContainer({ columns, rows }) {
  //const [dataRows,setDataRows] = React.useState(rows);
  const select_all_ref = React.useRef(null);
  const [sortBy, setSortBy] = React.useState([]);

  const [selectedRows, setSelectedRows] = React.useState({});

  // process the data and map uique id to each row
  const processedRows = React.useMemo(() => {
    return rows.map((item) => {
      let id = getUUID();

      return {
        id,
        ...item,
        columnsOrder: columns,
      };
    });
  }, [rows, columns]);

  // memo method sorting..
  const dataRows = React.useMemo(() => {
    if (sortBy.length > 0) {
      let [col, ord] = sortBy;
      return processedRows.sort((x, y) => {
        let [a, b] = ord === "asc" ? [x, y] : [y, x];

        if (a[col] > b[col]) {
          return 1;
        }
        if (a[col] < b[col]) {
          return -1;
        }
        return 0;
      });
    }

    return processedRows;
  }, [processedRows, sortBy]);

  //side effect to populated selected items
  React.useEffect(() => {
    let newState = {};
    processedRows.forEach((a) => {
      newState[a.id] = false;
    });

    setSelectedRows({ ...newState });
  }, [processedRows]);

  //side effect to show the indeterminated state
  React.useEffect(() => {
    let total = Object.keys(selectedRows).length;
    let selected = Object.keys(selectedRows).filter((k) =>
      Boolean(selectedRows[k]),
    );

    if (total === selected.length) {
      select_all_ref.current.checked = true;
      select_all_ref.current.indeterminate = false;
    } else if (selected.length > 0) {
      select_all_ref.current.indeterminate = true;
    } else if (selected.length === 0) {
      select_all_ref.current.checked = false;
      select_all_ref.current.indeterminate = false;
    }
  }, [selectedRows]);

  const rowChecked = (id, checked) => {
    setSelectedRows({ ...selectedRows, [id]: checked });
  };

  const sortBycolumn = (columnName) => {
    let [col, order] = sortBy;

    if (col === columnName) {
      order = order === "asc" ? "dsc" : "asc";
    } else {
      order = "asc";
    }

    setSortBy([columnName, order]);
  };

  const selectedAll = (state) => {
    let newState = {};

    Object.keys(selectedRows).forEach((key) => {
      newState[key] = state;
    });

    setSelectedRows(newState);
  };

  const selectedCount = (hs) => {
    let count = Object.keys(hs).filter((item) => hs[item]);
    return count.length == 0 ? "None Selected" : `Selected ${count.length}`;
  };

  const downloadSelectedAlert = (e) => {
    if (
      Object.keys(selectedRows).filter((item) => selectedRows[item]).length ===
      0
    ) {
      e.preventDefault();
      return false;
    }

    let mesg = "";
    dataRows.forEach((item) => {
      if (selectedRows[item.id]) {
        mesg += `${item.name} ${item.path}\n\n\n`;
      }
    });

    window.alert(mesg);
  };

  if (columns.length === 0 && rows.length) {
    return (
      <div className="table-container">
        <p>Sorry no data to display</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-actions">
        <div>
          <input
            data-testid={SELECT_ALL_TEST_ID}
            id="select-all"
            type="checkbox"
            ref={select_all_ref}
            onChange={(event) => selectedAll(event.target.checked)}
          />
        </div>
        <div>{selectedCount(selectedRows)}</div>
        <div>
          <button onClick={(event) => downloadSelectedAlert(event)}>
            {" "}
            Download Selected
          </button>
        </div>
      </div>
      <table className="data-table" data-testid={DATA_TABLE_TEST_ID}>
        <TableHeader columns={columns} sortBy={sortBycolumn} />
        <TableRowCollection
          rows={dataRows}
          columns={columns}
          rowChecked={rowChecked}
          selectedRows={selectedRows}
        />
      </table>
    </div>
  );
}
