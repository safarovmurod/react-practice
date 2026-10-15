import { useFormik } from "formik"
import { useSetAtom } from "jotai"
import { updateAtom } from "../store/jotai"

export default function DialogEdit({ user, setUser }: any) {
  const update = useSetAtom(updateAtom)

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: user?.name ?? "",
      job: user?.job ?? "",
      img: user?.img ?? "",
      desc: user?.desc ?? "",
    },

    onSubmit: (values) => {
      if (!user) return

      update({ ...user, ...values })
      setUser(null)
    },
  })

  if (!user) {
    return null
  }

  return (
    <dialog
      open
      className="fixed inset-0 m-auto z-50 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 w-[90%] max-w-[420px] backdrop:bg-black/40"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Edit User</h2>
        <button
          type="button"
          onClick={() => setUser(null)}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          ✕
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Name</label>
          <input
            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Job</label>
          <input
            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            type="text"
            name="job"
            value={formik.values.job}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Image URL</label>
          <input
            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            type="text"
            name="img"
            value={formik.values.img}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
          <input
            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            type="text"
            name="desc"
            value={formik.values.desc}
            onChange={formik.handleChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition"
            type="button"
            onClick={() => setUser(null)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </dialog>
  )
}