import { TableActions } from "./components/util/Table"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getData } from "./store/counterSlice"
import { useZusatnd } from "./store/useZustand"
import { useAtom } from "jotai"
import { dataJotai } from "./store/jotai"
import { DialogAdd } from "./components/util/DialogAdd"
import { PaginationDemo } from "./components/util/PaginationDemo"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --------Redax
// name
// job
// -----Zustand
// img
// status
// ----Jotai
// age
// city
export default function App() {
   // ---------- Redax  ---------
   const { data } = useSelector((state: any) => state.data)
   const dispatch = useDispatch()

   // ---------- Zustand  ---------
   const { dataZ, getZustand } = useZusatnd()

   // ---------- Jotai  ---------
   const [dataJ] = useAtom(dataJotai)

   //search
   const [search, setSearch] = useState('')
   const [select, setSelect] = useState('all')
   const [page, setPage] = useState(1)
   const [limit, setLimit] = useState(8)

   //useEffect
   useEffect(() => {
      let timer = setTimeout(() => {
         dispatch(getData({ search: search, select: select, page: page, limit: limit }))
      }, 500)
      return () => {
         clearTimeout(timer)
      }
   }, [search, select, page, limit])

   useEffect(() => {
      getZustand()
   }, [])

   let result = data.map((el: any) => {
      const Z = dataZ.find((z) => z?.id === el.id)
      const J = dataJ.find((j) => j?.id === el.id)
      return { ...el, ...Z, ...J } 
   })

   if (select !== 'all') {
      result = result.filter((el: any) => String(el.status) === select)
   }

   //dialogAdd
   const [open, setOpen] = useState(false)

   // UI
   return (
      <div className="w-[92%] max-w-6xl m-auto py-10">
         <div className="flex items-center justify-between gap-4 mb-6">
            <DialogAdd open={open} setOpen={setOpen} />
            <div className="flex items-center gap-3">
               <InputInline search={search} setSearch={setSearch} />
               <SelectStatus select={select} setSelect={setSelect} />
            </div>
         </div>
         <div>
            <TableActions result={result} />
         </div>
         <PaginationDemo page={page} setPage={setPage} />
      </div>
   )
}

export function InputInline({ search, setSearch }: any) {
  return (
    <Field orientation="horizontal">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-[240px] sm:w-[320px] h-10 px-3'
        type="search"
        placeholder="Search..."
      />
    </Field>
  )
}

export function SelectStatus({ select, setSelect }: any) {
  return (
    <Select value={select} onValueChange={(val) => setSelect(val)}>
      <SelectTrigger className="w-[140px] h-10">
        <SelectValue placeholder="All User" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All User</SelectItem>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

