import { render } from "@testing-library/react";
import App from "../App";

test("Renders the table", () => {
  const result = render(<App />);
  expect(result).toMatchSnapshot();
});

/*test("Render 5 rows in table",() => {
    const result = render(<App />);
     
});*/
