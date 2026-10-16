export const api = 'https://6a0f696cd2a9857070354e31.mockapi.io/v1/API'


export interface User{
    name:string
    status:string 
    img:strig
    id:string
}

export interface initialState{
    data:User[]
    loading:boolean
    error:any
}