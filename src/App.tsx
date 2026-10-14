import { useAtomValue, useSetAtom } from "jotai"
import { DeleteAtom, getData } from "./store/jotai"


export default function App() {
  const users = useAtomValue(getData)
  const deletUser = useSetAtom(DeleteAtom)
  return (
    <>
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col items-center text-center"
        >
          <img
            src={user.img}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-100 shadow-sm mb-3"
          />
          <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-1 mb-2">
            {user.job}
          </span>
          <p className="text-sm text-gray-500 line-clamp-3">{user.desc}</p>
                  <button onClick={()=>deletUser(user.id)} className='border-[1px] border-[gray] p-[10px]'>delete</button>   

        </div>
      ))}
    </div>
    </div>
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">   
        </div>
    </div>
    </>
  )
}
