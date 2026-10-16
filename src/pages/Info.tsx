import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserById } from "../store/createSlice"
import type { AppDispatch, RootState } from "../store/store"

interface InfoProps {
  id: string
  onBack: () => void
}

export default function Info({ id, onBack }: InfoProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { infoUser, infoLoading, infoError } = useSelector((state: RootState) => state.data)

  useEffect(() => {
    void dispatch(getUserById(id))
  }, [dispatch, id])

  function renderContent() {
    if (infoLoading || (!infoUser && !infoError)) return <p>Loading...</p>
    if (infoError) return <p role="alert" className="text-red-600">{infoError}</p>
    if (!infoUser || String(infoUser.id) !== id) return <p>Корбар ёфт нашуд.</p>

    return (
      <section className="border p-4 rounded-xl space-y-2">
        <h1 className="text-xl font-bold">{infoUser.name}</h1>
        <p>Синну сол: {infoUser.age ?? "—"}</p>
        <p>Статус: {infoUser.status ? "Online" : "Offline"}</p>
        <p>Completed: {infoUser.isCompleted ? "Yes" : "No"}</p>
        {infoUser.image && (
          <img src={infoUser.image} alt={infoUser.name} className="w-40 h-40 object-cover rounded-lg" />
        )}
      </section>
    )
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <button onClick={onBack} className="border p-2 rounded-lg mb-4 cursor-pointer">← Бозгашт</button>
      {renderContent()}
    </main>
  )
}
