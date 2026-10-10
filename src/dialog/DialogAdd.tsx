import { useDispatch } from "react-redux"
import { AddUserR } from "../store/counterSlice"

export default function DialogAdd({ open, setOpen }: any) {
  const dispatch = useDispatch()

  function add(e: any) {
    e.preventDefault()
    if (!e.target.name.value.trim()) return
    const newobj = {
      id: Date.now(),
      name: e.target.name.value.trim(),
      age: Number(e.target.age.value) || 0,
      status: e.target.status ? e.target.status.value === "online" : true,
    }
    dispatch(AddUserR(newobj))
    setOpen(false)
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-6 sm:p-7 w-full max-w-[440px] shadow-2xl relative overflow-hidden">
        {/* Top ambient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-xl font-bold text-white tracking-tight">Иловаи корбари нав</h4>
            <p className="text-xs text-slate-400 mt-0.5">Маълумоти корбарро ворид кунед</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-xl bg-[#090d16] hover:bg-[#1e293b] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-[#1f293d]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={add} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block uppercase tracking-wider">
              Ном (Name)
            </label>
            <input
              required
              className="w-full bg-[#090d16] border border-[#1f293d] hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-100 text-sm px-3.5 py-2.5 rounded-xl outline-none transition-all placeholder:text-slate-500"
              type="text"
              name="name"
              placeholder="Номи корбарро ворид кунед..."
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block uppercase tracking-wider">
              Синну сол (Age)
            </label>
            <input
              required
              className="w-full bg-[#090d16] border border-[#1f293d] hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-100 text-sm px-3.5 py-2.5 rounded-xl outline-none transition-all placeholder:text-slate-500"
              type="number"
              name="age"
              placeholder="Синну сол (масалан: 25)..."
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block uppercase tracking-wider">
              Ҳолат (Status)
            </label>
            <div className="relative">
              <select
                name="status"
                defaultValue="online"
                className="w-full appearance-none bg-[#090d16] border border-[#1f293d] hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-100 text-sm pl-3.5 pr-9 py-2.5 rounded-xl outline-none transition-all cursor-pointer"
              >
                <option value="online">Online (Дар шабака)</option>
                <option value="offline">Offline (Ғайрифаъол)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-[#1e293b] hover:bg-[#283548] text-slate-300 text-sm font-semibold py-2.5 rounded-xl transition-all cursor-pointer border border-[#334155]"
            >
              Бекор кардан
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
            >
              Сабт кардан
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

