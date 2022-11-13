import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";
import { MantineAgGridStyles } from "./styles";

export const MantineAgGrid = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" },
  ]);

  // Example load data from sever
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div className="ag-theme-mantine" style={{ width: "100%", height: 500 }}>
      <MantineAgGridStyles />
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
        }}
        animateRows={true}
        rowSelection="multiple"
        sideBar={true}
      />
    </div>
  );
};
