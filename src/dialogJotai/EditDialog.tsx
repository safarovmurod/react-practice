import { useAtom } from "jotai"
import { EditUser } from "../store/atom"

export default function EditDialog({ user, setUser }) {
  const [, EditUserJ] = useAtom(EditUser)

  function edit(e) {
    e.preventDefault()
    let editobj = {
      id: user.id,
      name: e.target.name.value,
      age: Number(e.target.age.value),
    }
    EditUserJ(editobj)
    e.target.reset()
    setUser(null)
  }

  if (!user) {
    return null
  }

  return (
    <dialog
      open={Boolean(user)}
      className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xl max-w-sm w-[320px] m-auto text-gray-800 font-semibold"
    >
      <p className="text-xl font-bold mb-4 text-center">Edit Dialog</p>
      <form onSubmit={edit} className="flex flex-col gap-3">
        <input
          defaultValue={user.name}
          className="outline-none border border-gray-300 rounded-xl p-2.5 focus:border-green-500 transition text-sm font-normal"
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <input
          defaultValue={user.age}
          className="outline-none border border-gray-300 rounded-xl p-2.5 focus:border-green-500 transition text-sm font-normal"
          type="number"
          name="age"
          placeholder="Age"
          required
        />
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() => setUser(null)}
            type="button"
            className="border text-sm rounded-xl bg-gray-200 text-gray-700 px-4 py-2 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border text-sm rounded-xl bg-green-600 text-white px-5 py-2 hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </dialog>
  )
}
