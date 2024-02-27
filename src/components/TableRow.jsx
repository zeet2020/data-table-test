import React from "react";

//pure component handle rendering of each rows
const TABLE_STATE = {
  available: "Available",
  scheduled: "Scheduled",
};

function TableRow({ data }) {
  let { columnsOrder } = data;

  const greenSvg = (
    <svg height="40" width="40" xmlns="http://www.w3.org/2000/svg">
      <circle r="8" cx="20" cy="20" fill="green" />
    </svg>
  );

  return (
    <>
      {columnsOrder &&
        columnsOrder.map((item, idx) => {
          if (item === "status") {
            return (
              <td key={idx}>
                <div className="status">
                  {data[item] === "available" ? greenSvg : ""}
                  {TABLE_STATE[data[item]]}
                </div>
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
