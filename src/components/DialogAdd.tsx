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
        setFormError("Номро дуруст ворид кун.")
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-96 max-w-full shadow-lg text-black">
        <h2 className="text-xl font-bold mb-4">Илова кардани корбар</h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="add-name" className="block text-sm font-medium mb-1">Ном</label>
            <input
              id="add-name"
              type="text"
              name="name"
              placeholder="Номи корбар..."
              value={formik.values.name}
              onChange={formik.handleChange}
              className="border border-gray-300 w-full p-2 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="add-age" className="block text-sm font-medium mb-1">Синну сол</label>
            <input
              id="add-age"
              type="number"
              name="age"
              min="0"
              placeholder="Синну сол..."
              value={formik.values.age}
              onChange={formik.handleChange}
              className="border border-gray-300 w-full p-2 rounded-lg outline-none focus:border-blue-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="status"
              checked={formik.values.status}
              onChange={formik.handleChange}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-medium">Статус (Online)</span>
          </label>

          {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={handleClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition cursor-pointer">
              Бекор кардан
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
            >
              {formik.isSubmitting ? "Сабт..." : "Сабт кардан"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
