import { useDispatch } from "react-redux"
import {  EditUserR } from "../store/createSlice"

export default function EditDialog({ user, setUser }) {
  const dispatch = useDispatch()
  function edit(e) {
    e.preventDefault()
    let ediObj = {
      id: user.id,
      name: e.target.name.value,
      age: e.target.age.value,
    }
    dispatch(EditUserR(ediObj))
    e.target.reset()
    setUser(null)
  }
  if (!user) {
    return null
  }
  return (
    <dialog open={user} className="p-6 border border-gray-200 rounded-2xl shadow-lg max-w-md w-[300px] m-auto bg-blue-300 text-gray-800 font-semibold text-lg">
      <p>EditDialog</p>
      <form onSubmit={edit}>
        <input defaultValue={user.name} className='outline-green mt-[5px] transition-transform border-[1px] border-[gray] rounded-2xl p-2' type="text" name="name" id="" />
        <input defaultValue={user.age} className='outline-green mt-[5px] transition-transform border-[1px] border-[gray] rounded-2xl p-2' type="text" name="age" id="" />
       <div className='flex mt-[10px] justify-between'>
          <button type='submit'>save</button>
          <button type='button' onClick={()=>setUser(null)}>cancel</button>
       </div>
      </form>
    </dialog>
  )
}
