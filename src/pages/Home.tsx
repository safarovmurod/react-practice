import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser } from "../store/CounterSlice"
import AddDialog from "../components/AddDialog"
import EditDialog from "../components/EditDialog"
import type { RootState } from "../store/store"
import type { User } from "../store/CounterSlice"

export default function Home() {
  const { data } = useSelector((state: RootState) => state.data)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const dispatch = useDispatch()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
        >
          Add User
        </button>
      </div>

      <AddDialog open={open} setOpen={setOpen} />
      <EditDialog user={user} setUser={setUser} />

      {/* Grid барои карточкаҳо */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((el) => {
          return (
            <div
              key={el.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {el.image && (
                      <img
                        src={el.image}
                        className="w-12 h-12 rounded-full object-cover border border-gray-100"
                      />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{el.name}</h2>
                      <p className="text-sm text-gray-500">Age: {el.age}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      el.status
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {el.status ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setUser(el)}
                  className="flex-1 border border-blue-500 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer text-center"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteUser(el.id))}
                  className="flex-1 border border-red-500 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer text-center"
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
