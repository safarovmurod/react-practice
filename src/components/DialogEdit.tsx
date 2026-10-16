import { useState } from "react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { editUser } from "../store/createSlice"
import type { User } from "../component/types"
import type { AppDispatch } from "../store/store"

interface DialogEditProps {
  user: User
  onClose: () => void
}

export default function DialogEdit({ user, onClose }: DialogEditProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [formError, setFormError] = useState("")

  const formik = useFormik({
    initialValues: {
      name: user.name,
      age: String(user.age ?? ""),
      status: user.status,
    },
    onSubmit: async (values) => {
      setFormError("")
      if (!values.name.trim()) {
        setFormError("Номро дуруст ворид кун.")
        return
      }
      try {
        await dispatch(
          editUser({
            ...user,
            name: values.name.trim(),
            age: values.age ? Number(values.age) : undefined,
            status: values.status,
          })
        ).unwrap()
        onClose()
      } catch (error) {
        setFormError(String(error))
      }
    },
  })

  function handleClose() {
    setFormError("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-96 max-w-full shadow-lg text-black">
        <h2 className="text-xl font-bold mb-4">Таҳрири корбар</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium mb-1">Ном</label>
            <input
              id="edit-name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="border border-gray-300 w-full p-2 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-age" className="block text-sm font-medium mb-1">Синну сол</label>
            <input
              id="edit-age"
              type="number"
              name="age"
              min="0"
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
