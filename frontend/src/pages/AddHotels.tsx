import { useMutation } from 'react-query';
import ManageHotelForm from '../forms/MangeHotelForm/MangeHotelForm'; 
import { useAppContext } from '../Context/AppContext';
import * as apiClient from "../api-client"

const AddHotel = () => {
     const {showToast} =useAppContext();
      const  {mutate, isLoading} =useMutation(apiClient.addMyHotel,{
        onSuccess: () => {
            showToast({ message: "HotelSaved", type: "SUCCESS" });
          },
          onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" });
          },
      });
       const handleSave =(hotelFormData:FormData)=>{
        mutate(hotelFormData);
       }
    return <ManageHotelForm  onSave={handleSave} isLoading={isLoading}/>;
};
export default AddHotel;
