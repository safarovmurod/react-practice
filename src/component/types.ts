export type UserId = number | string

export type User = {
  id: UserId
  name: string
  status: boolean
  age?: number | string
  image?: string
  isCompleted?: boolean
}

export type NewUser = Omit<User, "id">

export type InitialState = {
  data: User[]
  infoUser: User | null
  loading: boolean
  infoLoading: boolean
  error: string | null
  infoError: string | null
  search: string
  page: number
  pageSize: number
}
