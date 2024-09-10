import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hoteloptions";
import { HotelFormData } from "./MangeHotelForm";

const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Facilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {hotelFacilities.map((facility) => (
                    <label key={facility} className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            value={facility}
                            {...register("facilities", {
                                validate: (facilities) => {
                                    if (facilities && facilities.length > 0) {
                                        return true;
                                    }
                                    return "At least one facility should be selected";
                                }
                            })}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-red-500 text-sm font-semibold mt-2 block">
                    {errors.facilities.message}
                </span>
            )}
        </div>
    );
}

export default FacilitiesSection;
