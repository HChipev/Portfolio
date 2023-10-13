import { useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Languages = () => {
  const gridRef = useRef();

  const sizeToFit = useCallback(() => {
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  window.addEventListener("resize", sizeToFit);

  const [columnsDef, setColumnsDef] = useState([
    { headerName: "ID", field: "id", width: 100, resizable: true },
    { headerName: "Language", field: "language", width: 100, resizable: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="flex justify-between w-full h-full">
          <button
            className="flex items-center justify-center bg-blue hover:bg-amber-500 text-white font-bold mx-2 my-1 w-full rounded transition-all duration-300 ease-in-out"
            onClick={() => handleEdit(params.data)}>
            Edit
          </button>
          <button
            className="flex items-center justify-center bg-red hover:bg-redDark text-white font-bold mx-2 my-1 w-full rounded transition-all duration-300 ease-in-out"
            onClick={() => handleDelete(params.data.id)}>
            Delete
          </button>
        </div>
      ),
      width: 100,
      resizable: true,
    },
  ]);

  const [rowData, setRowData] = useState([
    { id: 1, language: "JavaScript" },
    { id: 2, language: "Python" },
    { id: 3, language: "Java" },
  ]);

  const handleEdit = (data) => {
    console.log("Edit:", data);
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  return (
    <div className="flex flex-col w-full py-3">
      <h1 className="text-3xl text-amber-500 mb-4 px-4">Languages</h1>
      <div className="ag-theme-alpine px-5" style={{ width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnsDef}
          rowData={rowData}
          onGridReady={sizeToFit}
          domLayout="autoHeight"
          suppressRowClickSelection={true}
        />
      </div>
    </div>
  );
};

export default Languages;
