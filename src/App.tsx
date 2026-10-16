import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DialogAdd from "./components/DialogAdd"
import { getData } from "./store/counterSlice"

export default function App() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.data)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        {open ? "Close" : "Add"}
      </button>

      <DialogAdd open={open} />

      <div>
        {loading ? (
          <h1>loading....</h1>
        ) : (
          data.map((el) => {
            return (
              <div
                key={el.id}
                className="border-[1px] border-[gray] p-[10px] w-[300px] h-[350px]"
              >
                <h1>{el.name}</h1>

                <img
                  className="w-[250px] h-[200px]"
                  src={el.img}
                  alt=""
                />

                <h1>{el.status ? "online" : "offline"}</h1>

                <div className="flex bg-[gray] p-[10px] w-[200px] justify-between">
                  <button onClick={() => dispatch(DeleteData(el.id))}>
                    Delete
                  </button>
                  <button>Edit</button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}