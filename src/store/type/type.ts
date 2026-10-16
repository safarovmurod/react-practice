export interface initialStateType{
    data:User[]
    loading:boolean
    error:any
}
interface User{
    id:string
    name:string
    img:string
    status: boolean
}