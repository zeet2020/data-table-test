import { render, fireEvent } from "@testing-library/react";
import TableContainer from "../components/TableContainer";
import mockdata from "../mockdata";
import { TABLE_ROW_TEST_ID } from "../components/TableRowCollection";

import { SELECT_ALL_TEST_ID } from "../components/TableContainer";

test("Renders the table", () => {
  const container = render(
    <TableContainer columns={Object.keys(mockdata[0])} rows={mockdata} />,
  );
  expect(container).toMatchSnapshot();
});

test("should render 5 rows ", () => {
  const container = render(
    <TableContainer columns={Object.keys(mockdata[0])} rows={mockdata} />,
  );

  let items = container.getAllByTestId(TABLE_ROW_TEST_ID);

  expect(items.length).toEqual(mockdata.length);
});

test("should select all on click of select", () => {
  const container = render(
    <TableContainer columns={Object.keys(mockdata[0])} rows={mockdata} />,
  );

  let checkbox = container.getByTestId(SELECT_ALL_TEST_ID);
  fireEvent.click(checkbox);
  let [item] = container.getAllByTestId(TABLE_ROW_TEST_ID);

  expect(item.querySelector("input").checked).toEqual(true);
});

test("should select of rows select all should be indeterminate state", () => {
  const container = render(
    <TableContainer columns={Object.keys(mockdata[0])} rows={mockdata} />,
  );
  const [row] = container.getAllByTestId(TABLE_ROW_TEST_ID);
  fireEvent.click(row.querySelector("input"));
  let checkbox = container.getByTestId(SELECT_ALL_TEST_ID);

  expect(checkbox.indeterminate).toEqual(true);
});
