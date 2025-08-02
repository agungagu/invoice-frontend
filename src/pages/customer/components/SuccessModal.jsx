import { useEffect } from "react";

const SuccessModal = ({ show, onClose, title = "Success", message = "Customer berhasil ditambahkan!" }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // auto close after 2.5s
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex text-black items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[320px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="text-green-500 text-4xl mb-2">✔</div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-4 rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
