import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./MangeHotelForm";

const ImagesSection = () => {
 const {register, formState:{ errors },} =useFormContext<HotelFormData>();

 return (
  <div >
<h2 className="text-2xl font-bold mb-3">Images</h2>
<div className="border rounded p-4 flex flex-col gap-4">
    <input type="file"
    multiple accept="image/*" className="w-full text-gray-700 font-normal"{...register("imageFiles", {
        validate:(imageFiles) =>{
        const totalLength = imageFiles.length;
        if(totalLength === 0){
            return "At least One image should br added";       
         }
         if(totalLength > 6){
            return "Maximum 6 images should be added";       
         }
        }
        
    })} 
    />
</div>
{errors.imageFiles && (
    <span className="text-red-500 text-sm font-semibold mt-4 block">
        {errors.imageFiles.message}
    </span>
)}
  </div>
)
}

export default ImagesSection;