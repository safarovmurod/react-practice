import { Provider } from "react-redux"
import { store } from "./store/store"
import Redux from "./pages/Redux"
import Zustand from "./pages/Zustand"
import Jotai from "./pages/Jotai"

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-[#090d16] text-[#f1f5f9] p-6 max-w-4xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-white border-b border-[#1f293d] pb-4">
          Практика: Redux | Zustand | Jotai
        </h1>

        {/* 1. Пейҷи Redux */}
        <Redux />

        {/* 2. Пейҷи Zustand */}
        <Zustand />

        {/* 3. Пейҷи Jotai */}
        <Jotai />
      </div>
    </Provider>
  )
}
