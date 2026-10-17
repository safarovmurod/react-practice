// import { Formik, useFormik } from "formik";
// import { useDispatch } from "react-redux";
// import z from "zod";
// import { addData } from "../store/couterSlice";

// export default function DialogAdd({open,setOpen}) {
//     const dispatch = useDispatch()
//     const Schema = z.object({
//   name: z.string(),
//   age: z.number(),
//   image: z.string(),
//   status: z.boolean(),
//   job: z.string(),
//   phone: z.string(),
// });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       age: "",
//       image: "",
//       status: false,
//       job: "",
//       phone: "",
//     },
//     validate: (values) => {
//       const result = Schema.safeParse(values);
//       if (!result.success) {
//         const errors = {};
//         result.error.issues.forEach((err) => {
//           errors[err.path[0]] = err.message;
//         });
//         return errors;
//       }
//     },
//     onSubmit: (values) => {
//       dispatch(addData(values));
//     },
//   });
//   return (
//     <dialog>
//         <p>Dialogdialog</p>
//         <form onSubmit={Formik.handleSubmit(onsubmit)} action="">
//             <input type="text" value={fromik.value.name} onChange={Formik.handleChange} name="name" id="" />
//             <input type="text"  value={fromik.value.age} onChange={Formik.handleChange} name="age" id="" />
//             <input type="text"  value={fromik.value.image} onChange={Formik.handleChange} name="image" id="" />
//             <input type="text"  value={fromik.value.job} onChange={Formik.handleChange}  name="job" id="" />
//             <input type="text" value={fromik.value.phone} onChange={Formik.handleChange} name="phone" id="" />
//             <button type='submit'>add</button>
//             <button type='button'>delete</button>
//         </form>
        
        
//    </dialog>
//   )
// }
