import TableContainer from "./components/TableContainer";
import "./App.css";
import mockdata from "./mockdata";

function App() {
  return (
    <>
      <TableContainer columns={Object.keys(mockdata[0])} rows={mockdata} />
    </>
  );
}

export default App;
