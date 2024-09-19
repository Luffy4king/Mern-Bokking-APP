import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from"../api-client";
import ManageHotelForm from "../forms/MangeHotelForm/MangeHotelForm";
import { useAppContext } from "../Context/AppContext";


const EditHotel = () => {
    const {hotelId} =useParams();
    const {showToast} =useAppContext();
    const {data:hotel} = useQuery(["fetchMyHotelById",hotelId],()=>
        apiClient.fetchMyHotelById(hotelId || ' '),
        {
            enabled: !!hotelId,
        }
    );

    const {mutate,isLoading} =useMutation(apiClient.updatedHotelById,{
        onSuccess:() =>{
          showToast({message:"Hotel Saved successfully",type:"SUCCESS"})
        },
        onError:() =>{
     showToast({message:"Error Saving Hotel",type:"ERROR"});
        }
        
    });
    
    const handleSave =(handleFormData:FormData) => {
        mutate(handleFormData);
    }
  return (
   <ManageHotelForm  hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
  )
}

export default EditHotel
