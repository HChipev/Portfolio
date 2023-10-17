import { useState, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ModalWrapper from "../ModalWrapper";
import ApiService from "../services/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { errorNotifications } from "../Notifications";

const Educations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({});
  };

  const gridRef = useRef();

  const sizeToFit = useCallback(() => {
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  const autoSizeAll = useCallback(() => {
    const allColumnIds = [];
    gridRef.current?.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current?.columnApi.autoSizeColumns(allColumnIds, false);
  }, []);

  window.addEventListener(
    "resize",
    window.innerWidth >= 640 ? sizeToFit : autoSizeAll
  );

  const [columnsDef] = useState([
    { headerName: "ID", field: "id", width: 100, resizable: true },
    {
      headerName: "Institution",
      field: "institution",
      width: 100,
      resizable: true,
    },
    {
      headerName: "Degree",
      field: "degree",
      width: 100,
      resizable: true,
    },
    {
      headerName: "Dates",
      field: "dates",
      width: 100,
      resizable: true,
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="flex justify-between w-full h-full">
          <button
            className="flex items-center justify-center bg-blue hover:bg-amber-500 text-white font-bold mx-2 my-1 w-full h-10 rounded transition-all duration-300 ease-in-out"
            onClick={() => handleEdit(params.data)}>
            <FontAwesomeIcon icon="fa-solid fa-edit" />
          </button>
          <button
            className="flex items-center justify-center bg-red hover:bg-redDark text-white font-bold mx-2 my-1 w-full h-10 rounded transition-all duration-300 ease-in-out"
            onClick={() => handleDelete(params.data.id)}>
            <FontAwesomeIcon icon="fa-solid fa-trash-alt" />
          </button>
        </div>
      ),
      width: 100,
      resizable: true,
      autoHeight: true,
    },
  ]);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    async function getEducations() {
      setRowData(
        (
          await ApiService.getEducations().catch((error) =>
            errorNotifications(
              error.response.data
                ? error.response.data.title ?? error.response.data
                : error.response.statusText
            )
          )
        ).data
      );
    }

    getEducations();
  }, []);

  const handleEdit = (data) => {
    openModal();
    setModalData(data);
  };

  const handleDelete = async (id) => {
    await ApiService.deleteEducation(id).catch((error) =>
      errorNotifications(
        error.response.data
          ? error.response.data.title ?? error.response.data
          : error.response.statusText
      )
    );
    setRowData(
      (
        await ApiService.getEducations().catch((error) =>
          errorNotifications(
            error.response.data
              ? error.response.data.title ?? error.response.data
              : error.response.statusText
          )
        )
      ).data
    );
  };

  const updateData = async (e) => {
    e.preventDefault();

    if (!modalData.id) {
      await ApiService.addEducation(modalData).catch((error) =>
        errorNotifications(
          error.response.data
            ? error.response.data.title ?? error.response.data
            : error.response.statusText
        )
      );
    } else {
      await ApiService.updateEducation(modalData).catch((error) =>
        errorNotifications(
          error.response.data
            ? error.response.data.title ?? error.response.data
            : error.response.statusText
        )
      );
    }

    setRowData(
      (
        await ApiService.getEducations().catch((error) =>
          errorNotifications(
            error.response.data
              ? error.response.data.title ?? error.response.data
              : error.response.statusText
          )
        )
      ).data
    );
    closeModal();
  };

  return (
    <div className="flex flex-col w-full py-4">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl text-amber-500 mb-4 px-4">Educations</h1>
        <button
          className="bg-blue text-white w-10 h-10 rounded-lg hover:bg-amber-500 transition-colors duration-300 focus:outline-none"
          onClick={openModal}>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </button>
      </div>
      <div className="ag-theme-alpine px-5" style={{ width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnsDef}
          rowData={rowData}
          onGridReady={window.innerWidth >= 640 ? sizeToFit : autoSizeAll}
          domLayout="autoHeight"
          suppressRowClickSelection={true}
        />
      </div>
      <ModalWrapper isOpen={isModalOpen} closeModal={closeModal}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl text-amber-500 mb-4">
            {modalData.id ? "Edit" : "Add"} Education
          </h1>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Education</label>
              <input
                type="text"
                placeholder="Education"
                className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                required
                value={modalData.institution ?? ""}
                onChange={(e) =>
                  setModalData({ ...modalData, institution: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Degree</label>
              <input
                type="text"
                placeholder="Degree"
                className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                required
                value={modalData.degree ?? ""}
                onChange={(e) =>
                  setModalData({ ...modalData, degree: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Dates</label>
              <input
                type="text"
                placeholder="Dates"
                className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                required
                value={modalData.dates ?? ""}
                onChange={(e) =>
                  setModalData({ ...modalData, dates: e.target.value })
                }
              />
            </div>
            <button
              onClick={updateData}
              type="submit"
              className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors duration-300 focus:outline-none">
              Save
            </button>
          </form>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default Educations;
