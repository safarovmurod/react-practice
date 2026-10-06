import { useContext } from "react"
import { Shop } from "../App"

export default function Order() {
  const { state, dispatch } = useContext(Shop)
  const totalSum = state.order.reduce((acc, el) => acc + el.sum, 0)
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h2 className="font-semibold text-lg text-stone-900 tracking-tight">
          Order
        </h2>
        <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 font-medium">
          {state.order.length} намуд
        </span>
      </div>

      <div className="mt-4">
        {state.order.length === 0 ? (
          <div className="py-10 text-center text-stone-400 text-sm">
            Сабад холӣ аст
          </div>
        ) : (
          <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
            {state.order.map((el) => (
              <div
                key={el.name}
                className="py-3 flex items-center justify-between gap-3 text-sm"
              >
                <div>
                  <p className="font-medium text-stone-900">{el.name}</p>
                  <p className="text-xs text-stone-400">миқдор: x{el.qty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900">{el.sum} с.</span>
                  <button
                    onClick={() => dispatch({ type: "delete", name: el.name })}
                    className="cursor-pointer text-stone-400 hover:text-rose-600 text-xs px-1.5 py-0.5 rounded hover:bg-rose-50 transition-colors ml-1"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-sm font-medium text-stone-600">
            общая сума:
          </span>
          <h4 className="text-xl font-bold text-stone-900">
            {totalSum} <span className="text-sm font-normal text-stone-500">сомонӣ</span>
          </h4>
        </div>
      </div>
    </div>
  )
}
