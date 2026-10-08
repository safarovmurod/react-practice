import { useDispatch } from "react-redux"
import { EditUser } from "../store/CounterSlice"
import { useState } from "react"
import type { User } from "../store/CounterSlice"

interface EditDialogProps {
  user: User | null
  setUser: (user: User | null) => void
}

export default function EditDialog({ user, setUser }: EditDialogProps) {
  const dispatch = useDispatch()
  const [image, setImage] = useState("")
  function HandleImage(e: any) {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }
  function EddUss(e: any) {
    e.preventDefault()
    if (!user) {
      return
    }
    const Editobj = {
      id: user.id,
      name: e.target.name.value,
      age: e.target.age.value,
      image: image || user.image,
      status: e.target.status.value === "online",
    }
    e.target.reset()
    setImage("")
    dispatch(EditUser(Editobj))
    setUser(null)
  }
  if (!user) {
    return null
  }
  return (
    <dialog
      open={Boolean(user)}
      className="fixed inset-0 m-auto p-6 rounded-xl shadow-xl border border-gray-200 bg-white w-80"
    >
      <h4 className="text-lg font-semibold mb-4 text-gray-800">Edit User</h4>
      <form onSubmit={EddUss} className="flex flex-col gap-3">
        <input type="file" accept="image/*" onChange={HandleImage} />
        <input
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          type="text"
          name="name"
          defaultValue={user.name}
          placeholder="name"
          id=""
        />
        <input
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          type="text"
          defaultValue={user.age}
          name="age"
          placeholder="age"
          id=""
        />
        <select
          name="status"
          defaultValue={user.status ? "online" : "offline"}
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 bg-white"
        >
          <option value="online">online</option>
          <option value="offline">offline</option>
        </select>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setUser(null)}
            type="button"
            className="border border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            save
          </button>
        </div>
      </form>
    </dialog>
  )
}
