import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalWrapper = ({ isOpen, closeModal, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div
                className="absolute inset-0 bg-darkGray opacity-75"
                onClick={closeModal}></div>
            </div>
            <div className="relative bg-white w-1/2 p-4 rounded-lg shadow-lg">
              <button
                className="absolute top-0 right-0 m-4 text-lg font-bold cursor-pointer hover:text-red transition-colors duration-300 focus:outline-none"
                onClick={closeModal}>
                <FontAwesomeIcon icon="fa-solid fa-times" />
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWrapper;
