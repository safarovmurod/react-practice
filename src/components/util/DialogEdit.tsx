import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useDispatch } from "react-redux"
import { useSetAtom } from "jotai"

import { editUser } from "@/store/counterSlice"
import { useZusatnd } from "@/store/useZustand"

// editJotai бояд номи воқеии atom-и Edit дар store бошад.
import { editJotai } from "@/store/jotai"

export function DialogEdit({ user, openEdit, setOpenEdit }) {
  const zod = z.object({
    name: z.string().optional(),
    status: z.boolean().optional(),
    img: z.any(),
    city: z.string().optional(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(zod),

    defaultValues: {
      name: user?.name ?? "",
      status: user?.status === true || user?.status === "true",
      img: user?.img ?? "",
      city: user?.city ?? "",
    },
  })

  const dispatch = useDispatch()

  // EditZustand бояд номи воқеии функсияи Edit дар store бошад.
  const EditZustand = useZusatnd((state) => state.EditZustand)

  const editJotaiUser = useSetAtom(editJotai)

  useEffect(() => {
    if (user && openEdit) {
      reset({
        name: user.name ?? "",
        status: user.status === true || user.status === "true",
        img: user.img ?? "",
        city: user.city ?? "",
      })
    }
  }, [user, openEdit, reset])

  function formSubmit(data) {
    if (!user) return

    const updatedUser = {
      id: user.id,
      name: data.name,
      status: data.status,
      img: data.img,
      city: data.city,
    }

    dispatch(editUser(updatedUser))
    EditZustand(updatedUser)
    editJotaiUser(updatedUser)

    setOpenEdit(false)
  }

  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(formSubmit)} key={user?.id}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>

            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="edit-name">Name</Label>

              <Input
                id="edit-name"
                placeholder="Full Name"
                {...register("name")}
              />
            </Field>

            <InputFile
              setValue={setValue}
              img={watch("img")}
            />

            <Field>
              <Label htmlFor="edit-city">City</Label>

              <Input
                id="edit-city"
                placeholder="User City"
                {...register("city")}
              />
            </Field>

            <Field>
              <Label htmlFor="edit-status">Status</Label>

              <SelectDemo
                setValue={setValue}
                value={watch("status")}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function SelectDemo({ setValue, value }) {
  return (
    <Select
      value={value === undefined ? "" : String(value)}
      onValueChange={(value) => setValue("status", value === "true")}
    >
      <SelectTrigger
        id="edit-status"
        className="w-full max-w-48"
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>STATUS</SelectLabel>

          <SelectItem value="true">
            Active
          </SelectItem>

          <SelectItem value="false">
            Inactive
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function InputFile({ setValue, img }) {
  function handleFile(e) {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setValue("img", reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <Field>
      <FieldLabel htmlFor="edit-picture">
        Picture
      </FieldLabel>

      {img && (
        <img
          src={img}
          alt="User"
          className="h-20 w-20 rounded-md object-cover"
        />
      )}

      <Input
        className="bg-blue-100"
        id="edit-picture"
        type="file"
        accept="image/*"
        onChange={handleFile}
      />

      <hr />
    </Field>
  )
}