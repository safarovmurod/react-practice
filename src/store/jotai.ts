import { apiJotai } from "@/data/apiJotai";
import axios from "axios";
import { atom } from "jotai";
import { atomWithRefresh, unwrap } from "jotai/utils";


export const loading= atom<boolean>(false)

export const getJotai =  atomWithRefresh(async(set)=>{
     try {
        const {data} = await axios.get(apiJotai)
        return data
     } catch (error) {
      console.error(error);
     }
})

export const  deleteJotay = atom(null,async(get,set,id)=>{
   try {
      await axios.delete(`${apiJotai}/${id}`)
      set(getJotai)
   } catch (error) {
      console.error(error);
      
   }
})

export const addJotai = atom(null,async(get,set,user)=>{
        try {
          await axios.post(apiJotai,user)
          set(getJotai)
        } catch (error) {
         console.error(error);
         
        }
})

export const editJotai = atom(null,async(get,set,user:any)=>{
        try {
          await axios.put(`${apiJotai}/${user.id}`,user)
          set(getJotai)
        } catch (error) {
         console.error(error);
         
        }
})

export  const dataJotai = unwrap(getJotai,(prev)=>prev||[])