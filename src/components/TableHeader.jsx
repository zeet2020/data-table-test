import React from "react";

//pure component handing the table headers or colums names

function TableHeader({ columns, sortBy }) {
  const toTitle = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1);
  };

  let columnsHeader = columns.map((item, idx) => {
    return (
      <th key={idx} onClick={() => sortBy(`${item}`)}>
        {toTitle(item)}
      </th>
    );
  });

  return (
    <thead>
      <tr>
        <td></td>
        {columnsHeader}
      </tr>
    </thead>
  );
}

export default React.memo(TableHeader);
