import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hoteloptions";
import { HotelFormData } from "./MangeHotelForm";

const TypeSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const typeWatch = watch("type");

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {hotelTypes.map((type) => (
                    <label
                        key={type}
                        className={`cursor-pointer text-sm rounded-full px-4 py-2 font-semibold flex items-center justify-center transition-colors duration-200
                            ${typeWatch === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        <input
                            type="radio"
                            value={type}
                            {...register("type", {
                                required: "This field is required",
                            })}
                            className="hidden"
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-red-500 text-sm font-semibold mt-4 block">
                    {errors.type.message}
                </span>
            )}
        </div>
    );
}

export default TypeSection;
