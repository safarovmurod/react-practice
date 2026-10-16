import type { User } from "../component/types"

interface DialogInfoProps {
  user: User | null
  onClose: () => void
}

export default function DialogInfo({ user, onClose }: DialogInfoProps) {
  if (!user) return null

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Маълумоти корбар</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer text-base"
          >
            ✕
          </button>
        </div>

        <div className="py-6 flex flex-col items-center text-center">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-indigo-50 text-indigo-600 ring-4 ring-indigo-100/50 flex items-center justify-center text-2xl font-bold shadow-xs mb-4">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          <h4 className="text-xl font-bold text-slate-900 mb-2">{user.name}</h4>

          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                user.status
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  user.status ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                }`}
              />
              {user.status ? "Online" : "Offline"}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                user.isCompleted
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {user.isCompleted ? "Иҷро шуд" : "Дар раванд"}
            </span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm text-slate-600 border border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">ID корбар:</span>
            <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
              {user.id}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Синну сол:</span>
            <span className="font-semibold text-slate-800">
              {user.age !== undefined && user.age !== "" ? `${user.age} сола` : "Муайян нашудааст"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition cursor-pointer"
          >
            Пӯшидан
          </button>
        </div>
      </div>
    </div>
  )
}
