import { useState } from "react"
import { useAtom } from "jotai"
import { dataAtom, DeleteUser } from "../store/atom"
import type { User } from "../store/atom"
import DialogAdd from "../components/DialogAdd"
import DialogEditAtom from "../components/DialogEditAtom"

export default function Home() {
  const [data] = useAtom(dataAtom)
  const [, DeleteUs] = useAtom(DeleteUser)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  return (
    <div>
      <DialogAdd open={open} setOpen={setOpen} />
      <DialogEditAtom user={user} setUser={setUser} />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-sm cursor-pointer"
        >
          <span className="text-lg leading-none">+</span> Add User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((el) => {
          return (
            <div
              key={el.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <img
                      src={el.avatar}
                      alt={el.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                      onError={(e: any) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                      }}
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        el.status ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      el.status
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {el.status ? "Active" : "Inactive"}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">{el.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Age: {el.age}</p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setUser(el)}
                  className="flex-1 py-1.5 px-3 border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition cursor-pointer text-center"
                >
                  Edit
                </button>
                <button
                  onClick={() => DeleteUs(el.id)}
                  className="flex-1 py-1.5 px-3 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition cursor-pointer text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
