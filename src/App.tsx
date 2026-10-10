import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DialogAdd from "./dialog/DialogAdd"
import DialogEdit from "./dialog/DialogEdit"
import { DeleteUserR, SelectUserR, SearchUserR, selectorsResult } from "./store/counterSlice"

export default function App() {
  const { select, search, data } = useSelector((state: any) => state.data)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const result = useSelector(selectorsResult)
  const dispatch = useDispatch()

  const totalUsers = data?.length || 0
  const onlineUsers = data?.filter((u: any) => u.status).length || 0
  const offlineUsers = totalUsers - onlineUsers

  // Helper avatar gradients
  const avatarGradients = [
    "from-indigo-600 via-indigo-500 to-purple-600",
    "from-violet-600 via-purple-500 to-fuchsia-600",
    "from-sky-600 via-blue-500 to-indigo-600",
    "from-emerald-600 via-teal-500 to-cyan-600",
  ]

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f1f5f9] px-4 py-8 sm:px-6 lg:px-10 relative overflow-hidden font-sans">
      {/* Background ambient decorative glows */}
      <div className="absolute top-[-10%] left-[15%] w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[25%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <DialogAdd open={open} setOpen={setOpen} />
      <DialogEdit user={user} setUser={setUser} />

      <div className="max-w-[1180px] mx-auto relative z-10">
        {/* Top Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-[#1f293d]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              Панели идоракунӣ
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight flex items-center gap-2.5">
              <span className="text-indigo-400">👥</span> User Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Идоракунӣ, таҳрир, ҷустуҷӯ ва назорати корбарон дар система
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1f293d] rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">Ҳамагӣ</span>
                <span className="text-sm font-bold text-white">{totalUsers}</span>
              </div>
            </div>

            <div className="bg-[#111827]/80 backdrop-blur-md border border-emerald-500/30 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-sm shadow-emerald-500/5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">Online</span>
                <span className="text-sm font-bold text-emerald-400">{onlineUsers}</span>
              </div>
            </div>

            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1f293d] rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">Offline</span>
                <span className="text-sm font-bold text-slate-300">{offlineUsers}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Toolbar & Filters */}
        <div className="mb-7 bg-[#111827]/90 backdrop-blur-md border border-[#1f293d] rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-black/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
          {/* Add User Button */}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Иловаи корбар
          </button>

          {/* Segmented Filter Pills */}
          <div className="inline-flex items-center bg-[#090d16] p-1 rounded-xl border border-[#1f293d] gap-1 self-stretch md:self-auto">
            <button
              onClick={() => dispatch(SelectUserR("all"))}
              className={`flex-1 md:flex-none text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                select === "all"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Ҳама ({totalUsers})
            </button>
            <button
              onClick={() => dispatch(SelectUserR("online"))}
              className={`flex-1 md:flex-none text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                select === "online"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                  : "text-slate-400 hover:text-emerald-400"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Online ({onlineUsers})
            </button>
            <button
              onClick={() => dispatch(SelectUserR("offline"))}
              className={`flex-1 md:flex-none text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                select === "offline"
                  ? "bg-slate-700 text-white shadow-sm shadow-slate-700/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Offline ({offlineUsers})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-full md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => dispatch(SearchUserR(e.target.value))}
              type="text"
              placeholder="Ҷустуҷӯ аз рӯи ном..."
              className="w-full bg-[#090d16] border border-[#1f293d] hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-100 placeholder:text-slate-500 text-sm pl-9 pr-8 py-2.5 rounded-xl outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => dispatch(SearchUserR(""))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {result.map((el: any, index: number) => {
            const gradient = avatarGradients[index % avatarGradients.length]

            return (
              <div
                key={el.id}
                className="group relative bg-[#111827]/75 hover:bg-[#141e32] backdrop-blur-sm border border-[#1f293d] hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top hover glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Avatar + Status Badge + ID */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative">
                      <div
                        className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${gradient} p-0.5 shadow-lg shadow-indigo-600/20`}
                      >
                        <div className="w-full h-full rounded-[14px] bg-[#090d16]/40 backdrop-blur-xs flex items-center justify-center text-xl font-extrabold text-white group-hover:scale-105 transition-transform duration-300">
                          {el.name ? el.name.charAt(0).toUpperCase() : "U"}
                        </div>
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#111827] ${
                          el.status
                            ? "bg-emerald-500 ring-2 ring-emerald-500/30"
                            : "bg-slate-500"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          el.status
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                            : "bg-slate-800 text-slate-400 border-slate-700/60"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            el.status ? "bg-emerald-400 animate-pulse" : "bg-slate-400"
                          }`}
                        />
                        {el.status ? "Online" : "Offline"}
                      </span>

                      <span className="text-[11px] font-mono text-slate-500 bg-[#090d16] px-2 py-0.5 rounded-md border border-[#1f293d]">
                        ID #{el.id}
                      </span>
                    </div>
                  </div>

                  {/* Name and Tag */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white capitalize tracking-tight group-hover:text-indigo-300 transition-colors truncate">
                      {el.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      @{el.name.toLowerCase().replace(/\s+/g, "")}
                    </p>
                  </div>

                  {/* Info Card Grid */}
                  <div className="bg-[#090d16]/80 rounded-xl p-3 border border-[#1f293d] mb-4 grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Синну сол
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">{el.age} сола</div>
                    </div>

                    <div className="text-right sm:text-left">
                      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center sm:justify-start justify-end gap-1.5">
                        <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Вазъият
                      </div>
                      <div className={`text-sm font-semibold mt-0.5 ${el.status ? "text-emerald-400" : "text-slate-400"}`}>
                        {el.status ? "Дар шабака" : "Ғайрифаъол"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3.5 border-t border-[#1f293d] flex items-center gap-2">
                  <button
                    onClick={() => setUser(el)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1e293b]/80 hover:bg-indigo-600 hover:text-white text-slate-200 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer border border-[#334155] hover:border-indigo-500"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Таҳрир
                  </button>
                  <button
                    onClick={() => dispatch(DeleteUserR(el.id))}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer border border-rose-500/20 hover:border-rose-500"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Нест кардан
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {result.length === 0 && (
          <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1f293d] rounded-2xl p-10 sm:p-14 text-center my-8 shadow-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ҳеҷ корбаре ёфт нашуд</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
              Бо ин филтр ё калимаи ҷустуҷӯ ягон маълумот пайдо нашуд. Шумо метавонед филтрро тоза кунед ё корбари нав илова намоед.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {(search || select !== "all") && (
                <button
                  onClick={() => {
                    dispatch(SearchUserR(""))
                    dispatch(SelectUserR("all"))
                  }}
                  className="bg-[#1e293b] hover:bg-[#283548] text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#334155] transition-all cursor-pointer"
                >
                  Тоза кардани филтрҳо
                </button>
              )}
              <button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/30"
              >
                + Иловаи корбар
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


