import { useDispatch } from "react-redux"
import { AddUserR } from "../store/createSlice"

export default function AddDialog({ open, setOpen }) {
  const dispatch = useDispatch()
  function add(e) {
    e.preventDefault()
    let newObj = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value,
    }
    dispatch(AddUserR(newObj))
    e.target.reset()
    setOpen(false)
  }
  return (
    <dialog open={open} className="p-6 border border-gray-200 rounded-2xl shadow-lg max-w-md w-[300px] m-auto bg-blue-300 text-gray-800 font-semibold text-lg">
      <p>AddDialog</p>
      <form onSubmit={add}>
        <input className='outline-green mt-[5px] transition-transform border-[1px] border-[gray] rounded-2xl p-2' type="text" name="name" id="" />
        <input className='outline-green mt-[5px] transition-transform border-[1px] border-[gray] rounded-2xl p-2' type="text" name="age" id="" />
       <div className='flex mt-[10px] justify-between'>
          <button type='submit'>save</button>
          <button type='button' onClick={()=>setOpen(false)}>cancel</button>
       </div>
      </form>
    </dialog>
  )
}
