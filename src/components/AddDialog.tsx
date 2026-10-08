import { useDispatch } from "react-redux"
import { AddUser } from "../store/CounterSlice"
import { useState } from "react"

interface AddDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AddDialog({ open, setOpen }: AddDialogProps) {
  const [image, setImage] = useState("")
  function HandleImage(e: any) {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }
  const dispatch = useDispatch()
  function AddUss(e: any) {
    e.preventDefault()
    const newUser = {
      name: e.target.name.value,
      age: e.target.age.value,
      image: image,
    }
    e.target.reset()
    setImage("")
    setOpen(false)
    dispatch(AddUser(newUser))
  }
  return (
    <dialog
      open={open}
      className="fixed inset-0 m-auto p-6 rounded-xl shadow-xl border border-gray-200 bg-white w-80"
    >
      <h4 className="text-lg font-semibold mb-4 text-gray-800">Add User</h4>
      <form onSubmit={AddUss} className="flex flex-col gap-3">
        <input
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          type="text"
          name="name"
          placeholder="name"
          id=""
        />
        <input type="file" accept="image/*" onChange={HandleImage} />
        <input
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          type="text"
          name="age"
          placeholder="age"
          id=""
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setOpen(false)}
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
