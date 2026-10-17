import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z, { boolean } from "zod"
import { AddData, getData } from "../store/counterSlice"
import { useDispatch } from "react-redux"

export default function DialogAdd({ open, setOpen }) {
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    await dispatch(AddData(data))
    dispatch(getData())
    setOpen(false)
  }
  const zod = z.object({
    name: z.string(),
    status: z.boolean(),
    img: z.string(),
  })
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(zod),
  })

  return (
    <dialog
      open={open}
      className="fixed inset-0 m-auto w-full max-w-md rounded-2xl border-0 bg-white p-6 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-semibold text-gray-800">Add New Item</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter name..."
            {...register("name")}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            placeholder="https://..."
            {...register("img")}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input type="checkbox" {...register("status")} className="sr-only peer" />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-colors" />
            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">Active</span>
        </label>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 active:scale-95 transition"
          >
            Add
          </button>
        </div>
      </form>
    </dialog>
  )
}
