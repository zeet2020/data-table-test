import React from "react";

//pure component handle rendering of each rows
const TABLE_STATE = {
  available: "Available",
  scheduled: "Scheduled",
};

function TableRow({ data }) {
  let { columnsOrder } = data;

  const greenSvg = (
    <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
      <circle r="8" cx="30" cy="40" fill="green" />
    </svg>
  );

  return (
    <>
      {columnsOrder &&
        columnsOrder.map((item, idx) => {
          if (item === "status") {
            return (
              <td key={idx}>
                {data[item] === "available" ? greenSvg : ""}
                {TABLE_STATE[data[item]]}
              </td>
            );
          } else {
            return <td key={idx}>{data[item]}</td>;
          }
        })}
    </>
  );
}

export default React.memo(TableRow);
