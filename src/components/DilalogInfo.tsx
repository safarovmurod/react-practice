export default function DialogInfo({ infoUser, setInfoUser }: any) {
  if (!infoUser) {
    return null
  }

  return (
    <dialog
      open
      className="fixed inset-0 m-auto z-50 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 w-[90%] max-w-[420px] backdrop:bg-black/40"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">User Details</h2>
        <button
          type="button"
          onClick={() => setInfoUser(null)}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col items-center text-center gap-3 py-2">
        <img
          src={infoUser.img}
          alt={infoUser.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-50 shadow-md"
        />

        <div>
          <h3 className="text-xl font-bold text-gray-800">{infoUser.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{infoUser.job}</p>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            infoUser.status
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-rose-50 text-rose-700 border border-rose-200"
          }`}
        >
          ● {infoUser.status ? "Online" : "Offline"}
        </span>

        <div className="w-full bg-gray-50 rounded-xl p-3.5 mt-2 text-left border border-gray-100">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            Description
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {infoUser.desc || "No description provided."}
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
        <button
          className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
          type="button"
          onClick={() => setInfoUser(null)}
        >
          Close
        </button>
      </div>
    </dialog>
  )
}
