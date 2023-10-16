import { useState, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ModalWrapper from "../ModalWrapper";
import ApiService from "../services/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { errorNotifications } from "../Notifications";

const Works = () => {
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
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, false);
  }, []);

  window.addEventListener("resize", sizeToFit);

  const [columnsDef] = useState([
    { headerName: "ID", field: "id", width: 100, resizable: true },
    { headerName: "Company", field: "company", width: 100, resizable: true },
    {
      headerName: "Description",
      field: "description",
      width: 100,
      resizable: true,
    },
    { headerName: "Site Url", field: "siteUrl", width: 100, resizable: true },
    {
      headerName: "Image",
      field: "image",
      autoHeight: true,
      cellClass: "flex justify-center items-center",
      cellRenderer: (params) => (
        <img
          src={`data:image/png;base64,${params.value}`}
          alt="Work Image"
          className="m-1 w-14 sm:w-24 object-cover rounded-lg"
        />
      ),
      width: 100,
      resizable: true,
    },
    {
      headerName: "Positions",
      field: "positions",
      cellRenderer: (params) => {
        const positions = params.value;
        return (
          <div className="nested-grid">
            <ul className="list-disc pl-4 overflow-x-auto">
              {positions.map((position) => (
                <li key={position.id} className="mb-2">
                  <span className="font-bold">Name:</span> {position.name},
                  <span className="ml-2 font-bold">Dates:</span>{" "}
                  {position.dates}
                </li>
              ))}
            </ul>
          </div>
        );
      },
      width: 200,
      autoHeight: true,
      resizable: true,
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="flex justify-between w-full h-full min-w-[100px]">
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
    },
  ]);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    async function getWorks() {
      setRowData(
        (
          await ApiService.getWorks().catch((error) =>
            errorNotifications(
              error.response.data
                ? error.response.data.title ?? error.response.data
                : error.response.statusText
            )
          )
        ).data
      );
    }

    getWorks();
  }, []);

  const handleEdit = (data) => {
    openModal();
    setModalData(data);
  };

  const handleDelete = async (id) => {
    await ApiService.deleteWork(id).catch((error) =>
      errorNotifications(
        error.response.data
          ? error.response.data.title ?? error.response.data
          : error.response.statusText
      )
    );
    setRowData(
      (
        await ApiService.getWorks().catch((error) =>
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
      await ApiService.addWork(modalData).catch((error) =>
        errorNotifications(
          error.response.data
            ? error.response.data.title ?? error.response.data
            : error.response.statusText
        )
      );
    } else {
      await ApiService.updateWork(modalData).catch((error) =>
        errorNotifications(
          error.response.data
            ? error.response.data.title ?? error.response.data
            : error.response.statusText
        )
      );
    }

    setRowData(
      (
        await ApiService.getWorks().catch((error) =>
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
        <h1 className="text-3xl text-amber-500 mb-4 px-4">Works</h1>
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
            {modalData.id ? "Edit" : "Add"} Work
          </h1>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Work</label>
              <input
                type="text"
                placeholder="Work"
                className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                required
                value={modalData.company ?? ""}
                onChange={(e) =>
                  setModalData({ ...modalData, company: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Description</label>
              <input
                type="text"
                placeholder="Description"
                className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                required
                value={modalData.description ?? ""}
                onChange={(e) =>
                  setModalData({ ...modalData, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-amber-500 font-bold">Site Url</label>
              <input
                type="text"
                placeholder="Site Url"
                className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                required
                value={modalData.siteUrl ?? ""}
                onChange={(e) =>
                  setModalData({ ...modalData, siteUrl: e.target.value })
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
                    alt="Work Image"
                    className="w-14 sm:w-24 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <h1 className="text-2xl text-amber-500 mb-4">Positions</h1>
            <div className="flex flex-col space-y-4">
              {modalData.positions?.map((position, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label className="text-amber-500 font-bold">
                      Position {index + 1}
                    </label>
                    <input
                      type="text"
                      placeholder={`Position ${index + 1}`}
                      className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                      required
                      value={position?.name ?? ""}
                      onChange={(e) => {
                        const updatedPositions = [...modalData.positions];
                        updatedPositions[index] = {
                          ...updatedPositions[index],
                          name: e.target.value,
                        };
                        setModalData({
                          ...modalData,
                          positions: updatedPositions,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-amber-500 font-bold">Dates</label>
                    <input
                      type="text"
                      placeholder="Dates"
                      className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500 focus:border-blue"
                      required
                      value={position?.dates ?? ""}
                      onChange={(e) => {
                        const updatedPositions = [...modalData.positions];
                        updatedPositions[index] = {
                          ...updatedPositions[index],
                          dates: e.target.value,
                        };
                        setModalData({
                          ...modalData,
                          positions: updatedPositions,
                        });
                      }}
                    />
                  </div>
                  <button
                    className="bg-red text-white py-2 px-4 rounded-lg hover:bg-redDark transition-colors duration-300 focus:outline-none"
                    onClick={() => {
                      const updatedPositions = [...modalData.positions];
                      updatedPositions.splice(index, 1);
                      setModalData({
                        ...modalData,
                        positions: updatedPositions,
                      });
                    }}>
                    <FontAwesomeIcon icon="fa-solid fa-trash-alt" />
                  </button>
                </div>
              ))}
              <button
                className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors duration-300 focus:outline-none"
                onClick={() => {
                  const updatedPositions = [
                    ...(modalData.positions ?? []),
                    { name: "", dates: "" },
                  ];
                  setModalData({ ...modalData, positions: updatedPositions });
                }}>
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </button>
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

export default Works;
