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
export default function App() {
  const { data, loading, error, search, page, pageSize } = useSelector(
    (state: RootState) => state.data
  )
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const visibleUsers = filteredData.slice((page - 1) * pageSize, page * pageSize)

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="border-[1px] p-[4px] rounded-lg text-[black] bg-gray-300 cursor-pointer"
        >
          add user
        </button>
        <input
          type="search"
          aria-label="Search users"
          placeholder="Search by name..."
          value={search}
          onChange={(event) => dispatch(setSearch(event.target.value))}
          className="border p-2 rounded-lg"
        />
      </div>

      <DialogAdd open={isOpen} onClose={() => setIsOpen(false)} />
      {editedUser && (
        <DialogEdit user={editedUser} onClose={() => setEditedUser(null)} />
      )}

      {loading && <h2>Loading...</h2>}
      {error && <p role="alert" className="text-red-600">{error}</p>}

      {!loading && !error && filteredData.length === 0 && <p>Корбар ёфт нашуд.</p>}

      {visibleUsers.map((user) => (
        <div key={user.id} className="border rounded-lg p-3 mb-3 space-y-2">
          <h4 className="font-semibold">{user.name}</h4>
          <p>{user.status ? "online" : "offline"}</p>
          {user.age !== undefined && <p>Age: {user.age}</p>}
          {user.image && (
            <img src={user.image} alt={user.name} className="w-24 h-24 object-cover rounded-lg" />
          )}

          <label className="flex items-center gap-2">
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
            />
            Completed
          </label>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => console.log("User info:", user.id)}
              className="border p-2 rounded-lg cursor-pointer"
            >
              Info
            </button>
            <button onClick={() => setEditedUser(user)} className="border p-2 rounded-lg cursor-pointer">
              Edit
            </button>
            <button
              className="border-[1px] p-[10px] rounded-lg cursor-pointer"
              onClick={() => dispatch(deleteUser(user.id))}
            >
              delete
            </button>
          </div>

        </div>
      ))}

      <div className="flex items-center gap-3 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => dispatch(setPage(page - 1))}
          className="border rounded-lg p-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span>Page {page} / {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => dispatch(setPage(page + 1))}
          className="border rounded-lg p-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </main>
  )
}
