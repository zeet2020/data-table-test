import { render } from "@testing-library/react";
import TableRow from "../components/TableRow";

test("Renders the table row", () => {
  const data = {
    id: "123",
    name: "john",
    age: "34",
    education: "B.E",
    columnsOrder: ["education", "name"],
  };
  const result = render(
    <>
      <TableRow data={data} />
    </>,
  );
  let ele = result.getByText(data.name);

  expect(ele.innerHTML).toBeTruthy();
  expect(result).toMatchSnapshot();
});

test("Renders the table row should be undefined", () => {
  const data = {
    id: "123",
    name: "john",
    age: "34",
    education: "B.E",
  };
  const result = render(
    <tr>
      <TableRow data={data} />
    </tr>,
  );

  expect(result.innerText).toBe(undefined);
});
