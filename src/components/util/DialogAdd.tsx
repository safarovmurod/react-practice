import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { atom, useSetAtom } from "jotai"
import { addRedax } from "@/store/counterSlice"
import { useZusatnd } from "@/store/useZustand"
import { addJotai } from "@/store/jotai"
import { useDispatch } from "react-redux"

export function DialogAdd({ open, setOpen }) {
   const zod = z.object({
      name: z.string().optional(),
      job: z.string().optional(),
      img: z.any(),
      age: z.coerce.number().optional(),
      city: z.string().optional(),
      status: z.boolean().optional(),
   })

   const { register, handleSubmit, setValue, reset } = useForm({
      resolver: zodResolver(zod),
   })

   const dispatch = useDispatch()

   const { AddZustand } = useZusatnd()

   const addJotaiUser = useSetAtom(addJotai)

   function submitAdd(user) {
      dispatch(addRedax(user))
      AddZustand(user)
      addJotaiUser(user)
      setOpen(false)
      reset()
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button
               type="button"
               className="h-10 px-5 font-medium rounded-lg shadow-xs"
            >
               ADD DIALOG
            </Button>
         </DialogTrigger>

         <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmit(submitAdd)}>
               <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                     Make changes to your profile here. Click save when you&apos;re done.
                  </DialogDescription>
               </DialogHeader>

               <FieldGroup>
                  <Field>
                     <Label htmlFor="name-1">Name</Label>
                     <Input id="name-1" placeholder="Full Name" {...register("name")} />
                  </Field>

                  <Field>
                     <Label htmlFor="job">Job</Label>
                     <Input id="job" placeholder="User Job" {...register("job")} />
                  </Field>

                  <Field>
                     <InputFile setValue={setValue} />
                  </Field>

                  <Field>
                     <Label htmlFor="age">age</Label>
                     <Input id="age" placeholder="User Age" {...register("age")} />
                  </Field>

                  <Field>
                     <Label htmlFor="city">City</Label>
                     <Input id="city" placeholder="User City" {...register("city")} />
                  </Field>

                  <Field>
                     <Label>Status</Label>
                     <SelectDemo setValue={setValue} />
                  </Field>
               </FieldGroup>

               <DialogFooter>
                  <DialogClose asChild>
                     <Button type="button" variant="outline">
                        Cancel
                     </Button>
                  </DialogClose>

                  <Button type="submit">Save changes</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}

export function SelectDemo({ setValue }) {
   return (
      <Select onValueChange={(value) => setValue("status", value === "true")}>
         <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select status" />
         </SelectTrigger>

         <SelectContent>
            <SelectGroup>
               <SelectLabel>STATUS</SelectLabel>
               <SelectItem value="true">Active</SelectItem>
               <SelectItem value="false">Inactive</SelectItem>
            </SelectGroup>
         </SelectContent>
      </Select>
   )
}

export function InputFile({ setValue }: { setValue: any }) {
   function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0]
      if (file) {
         const reader = new FileReader()
         reader.onloadend = () => {
            setValue("img", reader.result as string)
         }
         reader.readAsDataURL(file)
      }
   }

   return (
      <Field>
         <FieldLabel htmlFor="picture">Picture</FieldLabel>
         <Input
            className="bg-blue-100"
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleFile}
         />
         <hr />
      </Field>
   )
}
