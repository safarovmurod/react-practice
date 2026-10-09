import { useAtom } from "jotai"
import { AddUser } from "../store/atom"
import type { User } from "../store/atom"

interface DialogAddProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function DialogAdd({ open, setOpen }: DialogAddProps) {
  const [, AddJotai] = useAtom(AddUser)

  function addUser(e: any) {
    e.preventDefault()
    const newobj: User = {
      id: Date.now(),
      name: e.target.name.value,
      age: Number(e.target.age.value),
      avatar: e.target.avatar.value.trim() || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      status: e.target.status.value === "true",
    }
    AddJotai(newobj)
    e.target.reset()
    setOpen(false)
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <dialog
        open={open}
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 m-0"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold text-gray-800">Add New User</h4>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={addUser} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Алиҷон Сафаров"
              required
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Age</label>
            <input
              type="number"
              name="age"
              placeholder="e.g. 22"
              required
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Avatar (URL)</label>
            <input
              type="text"
              name="avatar"
              placeholder="https://... (холӣ монед default мемонад)"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
            <select
              name="status"
              defaultValue="true"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              <option value="true">Active (Online)</option>
              <option value="false">Inactive (Offline)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2.5 mt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer transition"
            >
              Save User
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
