import { MoreHorizontalIcon, PencilIcon, ShareIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AvatarDropdown } from "./Avatar"
import { useDispatch } from "react-redux"
import { useZusatnd } from "@/store/useZustand"
import { useSetAtom } from "jotai"
import { deleteJotay } from "@/store/jotai"
import { deleteRedax } from "@/store/counterSlice"
import { DialogEdit } from "./DialogEdit"
import { SheetInfo } from "./SheetInfo"
import { useState } from "react"

export function TableActions({result}) {
   const dispatch = useDispatch()
   const { deleteZustand } = useZusatnd()
   const deleteJotai = useSetAtom(deleteJotay)
   const [openEdit, setOpenEdit] = useState(false)
   const [userEdit, setUserEdit] = useState<any>(null)
   const [info, setInfo] = useState<any>(null)

   function handleEdit(item: any) {
      setUserEdit(item)
      setOpenEdit(true)
   }

   function DeleteUser(id) {
      dispatch(deleteRedax(id))
      deleteJotai(id)
      deleteZustand(id)  
   }
   // --------Redax
// name
// job
// -----Zustand
// img
// status
// ----Jotai
// age
// city
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="h-11 font-semibold text-foreground pl-6">Name</TableHead>
            <TableHead className="h-11 font-semibold text-foreground">job</TableHead>
            <TableHead className="h-11 font-semibold text-foreground">age</TableHead>
            <TableHead className="h-11 font-semibold text-foreground">city</TableHead>
            <TableHead className="h-11 font-semibold text-foreground">status</TableHead>
            <TableHead className="h-11 font-semibold text-foreground text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
         {result.map((el)=>{
           return(
             <TableRow key={el.id} className="transition-colors hover:bg-muted/30">
            <TableCell className="font-medium pl-6 py-3">
              <AvatarDropdown img={el}/>
            </TableCell>
            <TableCell className="py-3 text-muted-foreground">{el.job}</TableCell>
            <TableCell className="py-3">{el.age}</TableCell>
            <TableCell className="py-3">{el.city}</TableCell>
            <TableCell className="py-3">
              <span className={`inline-flex items-center justify-center w-20 py-0.5 text-xs font-semibold rounded-full ${el.status ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}>
                {el.status ? 'Active' : "Inactive"}
              </span>
            </TableCell>
            <TableCell className="text-right pr-6 py-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleEdit(el)}>
                      <PencilIcon />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInfo(el)}>
                      <ShareIcon />
                      info
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={()=>DeleteUser(el.id)} variant="destructive">
                      <TrashIcon />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
           )
         })}
        </TableBody>
      </Table>
      <DialogEdit user={userEdit} openEdit={openEdit} setOpenEdit={setOpenEdit} />
      <SheetInfo info={info} setInfo={setInfo} />
    </div>
  )
}
