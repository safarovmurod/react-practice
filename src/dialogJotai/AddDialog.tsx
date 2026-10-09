import { useAtom } from "jotai"
import { AddUser } from "../store/atom"

export default function AddDialog({ open, setOpen }) {
  const [, AddUserJ] = useAtom(AddUser)

  function add(e) {
    e.preventDefault()
    let newobj = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value,
    }
    AddUserJ(newobj)
    e.target.reset()
    setOpen(false)
  }
  return (
    <dialog
      open={open}
      className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xl max-w-sm w-[320px] m-auto text-gray-800 font-semibold"
    >
      <p className="text-xl font-bold mb-4 text-center">Add Dialog</p>
      <form onSubmit={add} className="flex flex-col gap-3">
        <input
          className="outline-none border border-gray-300 rounded-xl p-2.5 focus:border-green-500 transition text-sm font-normal"
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <input
          className="outline-none border border-gray-300 rounded-xl p-2.5 focus:border-green-500 transition text-sm font-normal"
          type="number"
          name="age"
          placeholder="Age"
          required
        />
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() => setOpen(false)}
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
