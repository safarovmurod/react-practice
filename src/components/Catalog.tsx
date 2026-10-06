import { useContext } from "react"
import { Shop } from "../App"
import catalogImg from "../assets/catalog.png"

export default function Catalog() {
  const { dispatch } = useContext(Shop)
  function HandleCatalog() {
    dispatch({ type: "AddProduct", name: "Catalog", price: 12 })
  }
  function HandleDeleteCatalog() {
    dispatch({ type: "delete", name: "Catalog" })
  }
  return (
    <div className="group bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-lg hover:-translate-y-0.5 hover:border-stone-300 transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-stone-900 text-base">Catalog</h3>
        <span className="text-sm font-semibold text-stone-800">234 с.</span>
      </div>

      <div className="my-4 w-full h-48 rounded-xl overflow-hidden flex items-center justify-center p-2">
        <img
          src={catalogImg}
          alt="Catalog"
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={HandleCatalog}
          className="flex-1 cursor-pointer py-2.5 px-3 bg-[#da7756] hover:bg-[#c96442] active:scale-[0.98] text-white text-sm font-medium rounded-xl transition-all shadow-xs text-center"
        >
          Catalog +
        </button>
        <button
          onClick={HandleDeleteCatalog}
          className="cursor-pointer py-2.5 px-4 bg-stone-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 active:scale-[0.98] text-stone-600 text-sm font-medium rounded-xl border border-stone-200 transition-all shadow-2xs"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
