import { useAtomValue, useSetAtom } from "jotai"
import { useState } from "react"
import { DeleteAtom, getData } from "./store/jotai"
import DialogEdit from "./components/DilalogEdit"
import DilalogAdd from "./components/DilalogAdd"
import DialogInfo from "./components/DilalogInfo"

export default function App() {
  const users = useAtomValue(getData)
  const deletUser = useSetAtom(DeleteAtom)

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<(typeof users)[number] | null>(null)
  const [infoUser, setInfoUser] = useState<(typeof users)[number] | null>(null)

  const [search, setSearch] = useState("")
  const [select, setSelect] = useState("")

  const filteredUsers = users?.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    if (select === "online") return matchSearch && item.status === true
    if (select === "offline") return matchSearch && item.status === false
    return matchSearch
  })

  return (
    <>
      <DilalogAdd open={open} setopen={setOpen} />

      <DialogEdit user={user} setUser={setUser} />

      <DialogInfo infoUser={infoUser} setInfoUser={setInfoUser} />

      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 bg-white p-4 rounded-xl shadow-xs border border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">User</h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <input
                className="w-52 px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                placeholder="Search..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition cursor-pointer text-gray-700 font-medium"
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <option value="">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>

              <button
                className="px-3.5 py-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-xs transition flex items-center gap-1 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                + Add User
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUsers?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {item.job}
                      </p>
                    </div>
                  </div>

                  <div className="mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        item.status
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status ? "bg-green-600" : "bg-red-600"
                        }`}
                      />
                      {item.status ? "Online" : "Offline"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {item.desc || "No description"}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-100">
                  <button
                    onClick={() => setInfoUser(item)}
                    className="flex-1 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                  >
                    Info
                  </button>

                  <button
                    onClick={() => setUser(item)}
                    className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deletUser(item.id)}
                    className="flex-1 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}