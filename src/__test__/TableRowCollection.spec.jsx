import { render } from "@testing-library/react";
import TableRowCollection from "../components/TableRowCollection";

test("Renders the table collection with", () => {
  const data = [
    {
      id: "123",
      name: "john",
      age: "34",
      education: "B.E",
      columnsOrder: ["education", "name"],
    },
  ];
  const result = render(
    <div>
      <TableRowCollection rows={data} rowChecked={() => {}} selectedRows={{}} />
    </div>,
  );
  expect(result).toMatchSnapshot();
});
