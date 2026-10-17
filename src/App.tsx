import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteData, getData } from "./store/couterSlice"
import { Box, CircularProgress } from "@mui/material"
// import DialogAdd from "./components/DialogAdd"
import DialogInfo from "./components/DialogInfo"

export default function App() {
  const {data,isloading} = useSelector((state)=>state.data)
  // const [open,setOpen] = useState(false)
    const [info,setInfo] = useState(null)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getData())
  },[])
 
  return <div>
    <div>
      <DialogInfo info={info} setInfo={setInfo}/>
    </div>
    {/* <DialogAdd open={open} setOpen={setOpen}/> */}
    <button className='border-[1px] border-[gray] p-[10px]'>add user +++</button>
    <div className='w-[80%] flex m-auto flex-wrap gap-[20px]'>
      {isloading?data.map((el)=>{
  return <Box key={el.id}>
    <div className='w-[300px]  h-[320px] border-[1px] border-[gray] p-[20px]'>
      <img className='w-[100px] h-[100px] rounded-4xl' src={el.img} alt="" />
   <div className='border-[1px] p-[9px] border-[gray] mt-[15px] text-start rounded-[30px] '>
      <h4>номш: {el.name}</h4>
      <h4>сол: {el.age}</h4>
      <h4>хаст нест: {el.status?"active":"inactive"}</h4>
      <h4>чобш:  {el.job}</h4>
      <h4>телш: {el.phone}</h4>
      <button className='border-[1px] w-[100px] bg-[red]  text-[white] border-[gray] p-[5px] rounded-2xl ' onClick={()=>dispatch(deleteData(el.id))}>delete</button>
      <button className='border-[1px] w-[100px] bg-[green]  text-[white] border-[gray] p-[5px] rounded-2xl ' onClick={()=>setInfo(el)}>info</button>
   </div>
    </div>
  </Box>
}):<CircularProgress aria-label="Loading…" />}
    </div>
  </div>
}
