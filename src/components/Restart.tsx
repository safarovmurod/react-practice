import { useContext } from "react"
import { Shop } from "../App"

export default function Restart() {
  const { dispatch } = useContext(Shop)
  function HandleRestart() {
    dispatch({ type: "reset" })
  }
  return (
    <div className="w-full">
      <button
        onClick={HandleRestart}
        className="w-full cursor-pointer py-3 px-4 bg-white hover:bg-stone-50 active:scale-[0.99] text-stone-600 hover:text-stone-900 text-sm font-medium rounded-xl border border-stone-200 shadow-2xs transition-all flex items-center justify-center gap-2"
      >
        <span>Тоза кардани сабад (Restart)</span>
      </button>
    </div>
  )
}
