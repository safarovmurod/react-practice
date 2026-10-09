import { atom } from "jotai"

export interface User {
  id: number
  name: string
  age: number
  avatar: string
  status: boolean
}

export const dataAtom = atom<User[]>([
  {
    id: 1,
    name: "Алиҷон Сафаров",
    age: 22,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    status: true,
  },
  {
    id: 2,
    name: "Мадина Каримова",
    age: 19,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: false,
  },
  {
    id: 3,
    name: "Рустам Назаров",
    age: 25,
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
    status: true,
  },
  {
    id: 4,
    name: "Шаҳноза Раҳимова",
    age: 21,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    status: true,
  },
  {
    id: 5,
    name: "Фарҳод Зокиров",
    age: 28,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: false,
  },
])

export const DeleteUser = atom(null, (get, set, id: number) => {
  set(
    dataAtom,
    get(dataAtom).filter((el) => el.id !== id)
  )
})

export const AddUser = atom(null, (get, set, user: User) => {
  set(dataAtom, [user, ...get(dataAtom)])
})

export const EditUserAtom = atom(null, (get, set, user: User) => {
  set(
    dataAtom,get(dataAtom).map((el) => (el.id === user.id ? { ...el, ...user } : el))
  )
})
