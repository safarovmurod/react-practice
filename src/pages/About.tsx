import { useAtom } from "jotai"
import { dataAtom, DeleteUser } from "../store/atom"
import AddDialog from "../dialogJotai/AddDialog"
import { useState } from "react"
import EditDialog from "../dialogJotai/EditDialog"

export default function Home() {
   const [data] = useAtom(dataAtom)
   const [open,setOpen] = useState(false)
   const [user,setUser] = useState(null)
   const [,DeleteUserJ] = useAtom(DeleteUser)
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs text-gray-800 font-semibold text-xl ">
      About
      <div>
        <AddDialog open={open} setOpen={setOpen}/>
        <EditDialog user={user} setUser={setUser} />
        <h1 className="text-[45px] text-[Gray]">Jotai</h1>
        <hr />
        <button onClick={()=>setOpen(true)}  className="border-[1px] mt-[10px] text-[15px] rounded-2xl bg-[green] text-[white] border-[gray] w-[120px] p-[10px]">
          Add User +
        </button>
        <div className="flex w-[99%] flex-wrap  gap-10">
          {data.map((el) => {
            return (
              <div className="mt-[30px]" key={el.id}>
                <div className="rounded-[10px] text-center  border-[1px] border-[gray] p-[40px] w-[270px] h-[200px]">
                  <p>name: {el.name}</p>
                  <p>age: {el.age}</p>
                  <div className="flex gap-5 mt-[25px] justify-center">
                    <button onClick={()=>DeleteUserJ(el.id)}  className="border-[1px] text-[15px] rounded-2xl bg-[red] text-[white] border-[gray] w-[70px] p-[10px]">
                      Delete
                    </button>
                    <button onClick={()=>setUser(el)} className="border-[1px] text-[15px] rounded-2xl bg-[green] text-[white] border-[gray] w-[70px] p-[10px]">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
