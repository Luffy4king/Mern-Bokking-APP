 import  {useForm} from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

 export type SignInFormData={
    email: string;
    password: string;
 }
const SignIn = () => {
    const {showToast}= useAppContext();
    const navigate = useNavigate();
    const queryClient=useQueryClient();
    const location =useLocation();
     const {
        register,
        formState:{errors},
    handleSubmit
} = useForm<SignInFormData>();

      const mutation =useMutation (apiClient.signIn, {
        onSuccess: async() => {
           showToast({message: 'Sign In Successfull!', type:'SUCCESS'})
           await  queryClient.invalidateQueries("validateToken")
            navigate(location.state?.from?.pathname ||"/");
        },
        onError: (error:Error) => {
showToast({message:error.message, type:'ERROR'});
        }
      })
       const onSubmit =handleSubmit ((data) => {
              mutation.mutate(data);                
       })

  return (
    <form  className="flex flex-col gap-5" onSubmit={onSubmit}>
         <h1 className="text-3xl font-bold">Sign-In</h1>

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

        <span className="flex items-center space-x-4 ">

            <span className="text-sm">Not Registered? <Link  className="underline text-blue-400" to="/register">Create  an Account</Link>
            </span>
             <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl  space-x-3">Login</button>
        </span>

    </form>
  )
}

export default SignIn;
