import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteUser,
  getUsers,
  setPage,
  setSearch,
  toggleCompleted,
} from "./store/createSlice"
import type { AppDispatch, RootState } from "./store/store"
import type { User } from "./component/types"
import DialogAdd from "./components/DialogAdd"
import DialogEdit from "./components/DialogEdit"
import DialogInfo from "./components/DialogInfo"

export default function App() {
  const { data, loading, error, search, page, pageSize } = useSelector(
    (state: RootState) => state.data
  )
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const [infoUser, setInfoUser] = useState<User | null>(null)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const visibleUsers = filteredData.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Рӯйхати корбарон
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Идоракунӣ, ҷустуҷӯ ва таҳрири маълумоти корбарон
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span className="text-lg leading-none">+</span>
            Иловаи корбар
          </button>
        </div>

        {/* Search & Stats Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="search"
              aria-label="Search users"
              placeholder="Ҷустуҷӯ бо ном..."
              value={search}
              onChange={(event) => dispatch(setSearch(event.target.value))}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 self-end sm:self-center">
            <span>Ҳамагӣ:</span>
            <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
              {filteredData.length} корбар
            </span>
          </div>
        </div>

        {/* Dialog Modals */}
        <DialogAdd open={isOpen} onClose={() => setIsOpen(false)} />
        {editedUser && (
          <DialogEdit user={editedUser} onClose={() => setEditedUser(null)} />
        )}
        <DialogInfo user={infoUser} onClose={() => setInfoUser(null)} />

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center my-6">
            <div className="inline-block w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-slate-600 font-medium text-sm">Дар ҳоли боргирӣ...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            role="alert"
            className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl mb-6 flex items-center gap-3"
          >
            <span>⚠️</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredData.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center my-6">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
              👤
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Корбар ёфт нашуд</h3>
            <p className="text-slate-500 text-sm">
              Бо чунин ном ягон корбар пайдо нашуд.
            </p>
          </div>
        )}

        {/* User Cards Grid */}
        {!loading && !error && visibleUsers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top: Avatar, Name & Status */}
                  <div className="flex items-start gap-3.5 mb-4">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-indigo-600 ring-2 ring-indigo-100/60 flex items-center justify-center font-bold text-base shrink-0">
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 text-base truncate">
                        {user.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            user.status
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-slate-100 text-slate-600 border border-slate-200/60"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              user.status ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                            }`}
                          />
                          {user.status ? "Online" : "Offline"}
                        </span>

                        {user.age !== undefined && user.age !== "" && (
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {user.age} сола
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Completed Checkbox */}
                  <div className="mb-4 pt-3 border-t border-slate-100">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900 select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(user.isCompleted)}
                        onChange={() =>
                          dispatch(
                            toggleCompleted({
                              id: user.id,
                              isCompleted: !user.isCompleted,
                            })
                          )
                        }
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                      />
                      <span className={user.isCompleted ? "text-emerald-700 font-semibold" : "text-slate-600"}>
                        {user.isCompleted ? "Иҷро шуд (Completed)" : "Иҷро нашудааст"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setInfoUser(user)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                  >
                    Инфо
                  </button>
                  <button
                    onClick={() => setEditedUser(user)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition cursor-pointer"
                  >
                    Таҳрир
                  </button>
                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="py-2 px-3 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition cursor-pointer"
                  >
                    Нест кардан
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {!loading && !error && filteredData.length > 0 && (
          <div className="flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-4 mt-6 shadow-xs">
            <button
              disabled={page <= 1}
              onClick={() => dispatch(setPage(page - 1))}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              ← Қаблӣ
            </button>

            <span className="text-sm font-medium text-slate-600">
              Саҳифаи <span className="font-bold text-slate-900">{page}</span> аз{" "}
              <span className="font-bold text-slate-900">{totalPages}</span>
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => dispatch(setPage(page + 1))}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Баъдӣ →
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
