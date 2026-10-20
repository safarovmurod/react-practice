import { apiZustand } from "@/data/apiZustand";
import axios from "axios";
import { create } from "zustand";
interface User{
   id:number,
   img:string,
   status:boolean
}
interface Data{
   dataZ:User[],
   loading:boolean,
   error:unknown,
   getZustand:()=>void,
   deleteZustand:(id:any)=>void
   AddZustand:(user:any)=>void,
   EditZustand:(user:any)=>void
}

export const useZusatnd = create<Data>((set,get)=>({
   dataZ:[],
   loading:false,
   error:null,
   getZustand:async()=>{
      set({loading:true})
      try {
          const {data} = await axios.get(apiZustand)
          set({dataZ:data,loading:false})
          return data
      } catch (error) {
         console.error(error);
         
      }   
   },
   deleteZustand:async(id)=>{
      try {
         await axios.delete(`${apiZustand}/${id}`)
         get().getZustand()
      } catch (error) {
         console.error(error);
         
      }
   },
   AddZustand:async(user)=>{
      try {
         await axios.post(apiZustand,user)
         get().getZustand()
      } catch (error) {
         console.error(error); 
      }
   },
   EditZustand:async(user)=>{
      try {
         await axios.put(`${apiZustand}/${user.id}`,user)
         get().getZustand()
      } catch (error) {
         console.error(error); 
      }
   }
}))

