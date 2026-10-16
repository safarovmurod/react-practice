import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z, { boolean } from "zod"
import { AddData, getData } from "../store/counterSlice"

export default function DialogAdd({ open, setOpen }) {
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    await dispatch(AddData(data))
    dispatch(getData())
    setOpen(false)
  }
  const zod = z.object({
    name: z.string(),
    status: z.boolean(),
    img: z.string(),
  })
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(zod),
  })

  return (
    <dialog open={open}>
      <p>DialogAdd</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="checkbox" {...register("status")} />
        <input type="text" {...register("img")} />
        <button type="submit">Add</button>
      </form>
    </dialog>
  )
}
