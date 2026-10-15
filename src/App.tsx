import { useState } from "react"
import { DialogAdd } from "./components/DialodAdd"

interface User{
  id:number,
  name:string
}


export default function App() {
  const [open,setOpen] = useState(false)
   const user:User[] = [
    {
      id:1,
      name:"nnane"
    }
   ]
   const age:number = 22
  return <>
  <h1>{age}</h1>
  {user}
  <DialogAdd open={open} setOpen={setOpen}/>
  </>
}

