import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import  *  as apiClient from '../api-client';
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

 export type RegisterFormData ={
     firstName:string,
     lastName:string,
     email:string,
     password:string,
     confirmPassword:string,
  
}


const Register = () => {
     const queryClient=useQueryClient();
    const navigate = useNavigate();
     const {showToast} =useAppContext();
     const {register,watch,handleSubmit,formState:{errors},} = useForm<RegisterFormData>();
 const mutation=useMutation(apiClient.register,{
    onSuccess: async () =>{
       showToast({message: "Registration Success", type:"SUCCESS"});
       await queryClient.invalidateQueries("validateToken");
       navigate("/");
    },
    onError: (error:Error) =>{
        showToast({message: error.message, type:"ERROR"})
    }
 });

     const onSubmit= handleSubmit((data)=>{
 mutation.mutate(data);
     });
  return (
   <form  className="flex flex-col gap-5 " onSubmit={onSubmit}>
    <h2 className="text-3xl font-bold">Create an Account</h2>
    <div className="flex  flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input {...register("firstName",{
                required: "First name should contain only alphabetic characters",
            
            })} className="w-full px-3 py-2 rounded-md text-gray-700" placeholder="your Name"/>
            {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
            )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input {...register("lastName",{
                required: "Last name should contain only alphabetic characters"
            })} className="w-full px-3 py-2 rounded-md text-gray-700" placeholder="LastName"/>
             {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
            )}
        </label>
    </div>
    <label className="text-gray-700 text-sm font-bold flex-1">
           Email
            <input  type="email"
            {
                ...register("email",{
           required: "This field is required",
            })} className="w-full px-3 py-2 rounded-md text-gray-700" placeholder="Email"/>
             {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
         Password
            <input  type="password" 
            {
                ...register("password",{
                required: "This filed is required", minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters long"
                }
            })} className="w-full px-3 py-2 rounded-md text-gray-700" placeholder="Password"/>
             {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
            )}
        </label>


        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
            <input  type="password" 
            {
                ...register("confirmPassword",{
               validate:(val) =>{
                if(!val) {
                        return "this filed is required";    
                }
                else if(watch("password") !== val){
                    return "Your  password  does not match"
                }

               }
            })} className="w-full px-3 py-2 rounded-md text-gray-700" placeholder="Confirm"/>
             {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
            )}
        </label>
        <span>
             <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">Create Account</button>
        </span>

    
   </form>
 
  )
}

export default Register
