import { createContext, useReducer } from "react"
import Coffe from "./components/Coffe"
import Kruassane from "./components/Kruassane"
import Order from "./components/Order"
import Restart from "./components/Restart"
import Catalog from "./components/Catalog"

export const Shop = createContext(null)

const initialState = {
  order: [],
}

function reducer(state, action) {
  switch (action.type) {
    case "AddProduct": {
      const haveProduct = state.order.some((item) => item.name === action.name)

      const order = haveProduct
        ? state.order.map((item) =>
            item.name === action.name
              ? {
                  ...item,
                  qty: item.qty + 1,
                  sum: item.sum + action.price,
                }
              : item
          )
        : [...state.order, { name: action.name, qty: 1, sum: action.price }]

      return { order }
    }

    case "delete": {
      const targetName = action.name || action.products?.name || action.id
      const order = state.order.filter(
        (item) => item.name !== targetName && item.id !== targetName
      )
      return { ...state, order }
    }

    case "reset":
      return { ...state, order: [] }

    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Shop.Provider value={{ state, dispatch }}>
      <div className="min-h-screen bg-[#fbfaf7] text-stone-800 antialiased py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="border-b border-stone-200 pb-4">
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              Меню
            </h1>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <section className="md:col-span-7 flex flex-col gap-4">
              <Coffe />
              <Kruassane />
              <Catalog />
              <div className="pt-1">
                <Restart />
              </div>
            </section>

            <section className="md:col-span-5 md:sticky md:top-8">
              <Order />
            </section>
          </main>
        </div>
      </div>
    </Shop.Provider>
  )
}
