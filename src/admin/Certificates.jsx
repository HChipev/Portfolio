import { useState, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ModalWrapper from "../ModalWrapper";
import ApiService from "../services/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { errorNotifications } from "../Notifications";

const Certificates = () => {
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
    { headerName: "Certificate", field: "name", width: 100, resizable: true },
    { headerName: "Issuer", field: "issuer", width: 100, resizable: true },
    {
      headerName: "Image",
      field: "image",
      autoHeight: true,
      cellClass: "flex justify-center items-center",
      cellRenderer: (params) => (
        <img
          src={`data:image/png;base64,${params.value}`}
          alt="Certificate Image"
          className="m-1 w-14 sm:w-24 object-cover rounded-lg"
        />
      ),
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
      width: 150,
      resizable: true,
      autoHeight: true,
    },
  ]);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    async function getCertificates() {
      setRowData(
        (
          await ApiService.getCertificates().catch((error) =>
            errorNotifications(
              error.response.data
                ? error.response.data.title ?? error.response.data
                : error.response.statusText
            )
          )
        ).data
      );
    }

    getCertificates();
  }, []);

  const handleEdit = (data) => {
    openModal();
    setModalData(data);
  };

  const handleDelete = async (id) => {
    await ApiService.deleteCertificate(id).catch((error) =>
      errorNotifications(
        error.response.data
          ? error.response.data.title ?? error.response.data
          : error.response.statusText
      )
    );
    setRowData(
      (
        await ApiService.getCertificates().catch((error) =>
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
      await ApiService.addCertificate(modalData).catch((error) =>
        errorNotifications(
          error.response.data
            ? error.response.data.title ?? error.response.data
            : error.response.statusText
        )
      );
    } else {
      await ApiService.updateCertificate(modalData).catch((error) =>
        errorNotifications(
          error.response.data
            ? error.response.data.title ?? error.response.data
            : error.response.statusText
        )
      );
    }

    setRowData(
      (
        await ApiService.getCertificates().catch((error) =>
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
        <h1 className="text-3xl text-amber-500 mb-4 px-4">Certificates</h1>
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
            {modalData.id ? "Edit" : "Add"} Certificate
          </h1>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Certificate</label>
              <input
                type="text"
                placeholder="Certificate"
                className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                required
                value={modalData.name ?? ""}
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Issuer</label>
              <input
                type="text"
                placeholder="Issuer"
                className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                required
                value={modalData.issuer ?? ""}
                onChange={(e) =>
                  setModalData({ ...modalData, issuer: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Image</label>
              <div className="relative flex py-0.5 w-full">
                <label
                  htmlFor="fileInput"
                  className="flex cursor-pointer w-full">
                  <span className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors duration-300 w-full">
                    <FontAwesomeIcon icon="fa-solid fa-upload" /> Upload Image
                  </span>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      const base64String = reader.result
                        .replace("data:", "")
                        .replace(/^.+,/, "");

                      setModalData({ ...modalData, image: base64String });
                    };
                  }}
                />
              </div>
              {modalData.image && (
                <div className="flex items-center justify-center w-full h-full border border-amber-500 rounded-lg">
                  <img
                    src={`data:image/png;base64,${modalData.image}`}
                    alt="Certificate Image"
                    className="w-14 sm:w-24 object-cover rounded-lg"
                  />
                </div>
              )}
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

export default Certificates;
