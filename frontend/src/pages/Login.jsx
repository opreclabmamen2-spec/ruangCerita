import LoginForm from "../components/LoginForm"

const Login = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      {/* CARD */}
      <div
        className="w-full max-w-md bg-white rounded-2xl p-5 sm:p-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // ⛔ biar ga nutup kalau klik dalam
      >
        {/* HEADER */}
        <div className="flex justify-end items-center">
          <button
            onClick={onClose}
            className="text-xl sm:text-2xl leading-none text-gray-500 hover:text-black cursor-pointer p-1 -m-1"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="mt-2 sm:mt-4">
          <LoginForm onClose={onClose} />
        </div>
      </div>
    </div>
  )
}

export default Login