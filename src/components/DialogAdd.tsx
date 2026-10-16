import { useState } from "react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { addUser } from "../store/createSlice"
import type { AppDispatch } from "../store/store"

interface DialogAddProps {
  open: boolean
  onClose: () => void
}

export default function DialogAdd({ open, onClose }: DialogAddProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [formError, setFormError] = useState("")

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      status: false,
    },
    onSubmit: async (values, { resetForm }) => {
      setFormError("")
      if (!values.name.trim()) {
        setFormError("Номро дуруст ворид кунед.")
        return
      }
      try {
        await dispatch(
          addUser({
            name: values.name.trim(),
            age: values.age ? Number(values.age) : undefined,
            status: values.status,
            isCompleted: false,
          })
        ).unwrap()
        resetForm()
        onClose()
      } catch (error) {
        setFormError(String(error))
      }
    },
  })

  function handleClose() {
    formik.resetForm()
    setFormError("")
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100 text-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Иловаи корбари нав</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-4">
          <div>
            <label htmlFor="add-name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Ному насаб
            </label>
            <input
              id="add-name"
              type="text"
              name="name"
              placeholder="Мисол: Ҷамшед Сафаров"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition text-slate-800"
              required
            />
          </div>

          <div>
            <label htmlFor="add-age" className="block text-sm font-medium text-slate-700 mb-1.5">
              Синну сол
            </label>
            <input
              id="add-age"
              type="number"
              name="age"
              min="0"
              placeholder="Мисол: 25"
              value={formik.values.age}
              onChange={formik.handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition text-slate-800"
            />
          </div>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer select-none">
            <input
              type="checkbox"
              name="status"
              checked={formik.values.status}
              onChange={formik.handleChange}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-700">Ҳолат дар шабака (Online)</span>
          </label>

          {formError && (
            <p role="alert" className="text-sm text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-100">
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium transition cursor-pointer"
            >
              Бекор кардан
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition cursor-pointer disabled:opacity-50 shadow-sm"
            >
              {formik.isSubmitting ? "Сабт..." : "Илова кардан"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
