import { atom } from "jotai"

export const dataAtom = atom([
  {
    id: 1,
    name: "ali",
    age: 21,
  },
  {
    id: 2,
    name: "vali",
    age: 41,
  },
  {
    id: 3,
    name: "saidali",
    age: 81,
  },
])
interface User {
  id: number
  name: string
  age: number
}
export const DeleteUser = atom(null, (get, set, id) => {
  set(
    dataAtom,
    get(dataAtom).filter((el) => el.id !== id)
  )
})

export const EditUser = atom(null, (get, set, user:User) => {
  set(
    dataAtom,
    get(dataAtom).map((el) => el.id === user.id ? user : el)
  )
})

export const AddUser = atom(null, (get, set, user: User) => {
  set(dataAtom, [...get(dataAtom), user])
})
