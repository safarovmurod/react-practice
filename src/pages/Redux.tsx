import { useSelector } from "react-redux"

export default function Redux() {
  const {data} = useSelector(state=>state.data)  
  return (
    <div className="p-6 bg-[#111827] border border-indigo-500/30 rounded-2xl shadow-lg">
      <button > add + </button>
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full">
          ⚛️ Redux Toolkit
        </span>
        <h2 className="text-xl font-bold text-white">Саҳифаи Redux</h2>
      </div>
      <p className="text-sm text-slate-400">
        Мансур, инҷо метавонӣ логика ва компонентҳои Redux-ро нависӣ.
      </p>
       <div>
       
       </div>
    </div>
  )
}
