import { axiosReques, savetoken } from "../token/token";

export default function Login() {
//  7
   async function Login(info) {
      try {
          const {data} =await axiosReques.post('/auth/login',info)
          savetoken(data.data,data.refresh)
          console.log(data);
          
      } catch (error) {
         console.error(error);
      }
   }
   // 8
   function handleSubmit(e) {
      e.preventDefault()
      const info ={
       email:e.target.email.value,
       password:e.target.password.value
      }
      Login(info)
      e.target.reset()
   }
   return (
      // 6
      <div>
         Login
         <form onSubmit={(e)=>handleSubmit(e)}>
            <input className='border p-[7px]' placeholder='email' type="email"  name="email" id="" />
            <input className='border p-[7px]' placeholder='password' type="text" name="password" id="" />
            <button type='submit' >Login</button>
         </form>
      </div>
   )
}
