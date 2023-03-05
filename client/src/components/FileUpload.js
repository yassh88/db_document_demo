import React, { useState, useEffect } from "react";
import { UploadFileModal } from "./UploadFileModal";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";

const UploadFiles = () => {
  const table = useSelector((state) =>
    state.files.data.table ? state.files.data.table : []
  );
  const ColourCellRenderer = (props) => {
    if (props.data.fileDetails && props.data.fileDetails.length) {
      return props.data.fileDetails.map((obj) => (
        <ol key={obj.id}>
          <a href={obj.url}>{obj.name}</a>
        </ol>
      ));
    } else {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
  };

  const DateCellRender = (props) => (
    <span>
      {new Date(
        props.data.date ? parseInt(props.data.date) : ""
      ).toLocaleString()}
    </span>
  );

  const columnDefs = [
    { headerName: "Uploader", field: "uploader" },
    { headerName: "Description", field: "description" },
    { headerName: "Upload Reason", field: "uploadReason" },
    {
      headerName: "Upload Date",
      field: "date",
      cellRenderer: DateCellRender,
    },
    {
      headerName: "Documents",
      field: "fileDetails",
      cellRenderer: ColourCellRenderer,
      autoHeight: true,
    },
  ];
  const [gridData, setGridData] = useState({
    rowData: [],
  });
  useEffect(() => {
    if (table.length) {
      setGridData({ ...gridData, rowData: table });
    }
  }, [table]);

  console.log("gridData", gridData);
  return (
    <div className="mb-3">
      <UploadFileModal />
      <div
        className="ag-theme-alpine mb-3"
        style={{
          height: "500px",
          width: "1000px",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={gridData.rowData}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default UploadFiles;

UploadFiles.propTypes = {
  data: PropTypes.object,
};
