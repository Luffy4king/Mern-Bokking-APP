import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./MangeHotelForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">Add Hotel</h1>
            
            <div className="space-y-6">
                {/* Name */}
                <label className="block text-gray-700 text-sm font-bold">
                    Name
                    <input
                        type="text"
                        {...register("name", {
                            required: "This field is required",
                        })}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>
                    )}
                </label>

                {/* City and Country */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    {/* City */}
                    <label className="flex-1 text-gray-700 text-sm font-bold">
                        City
                        <input
                            type="text"
                            {...register("city", {
                                required: "This field is required",
                            })}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="City"
                        />
                        {errors.city && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.city.message}</span>
                        )}
                    </label>
                    {/* Country */}
                    <label className="flex-1 text-gray-700 text-sm font-bold">
                        Country
                        <input
                            type="text"
                            {...register("country", {
                                required: "This field is required",
                            })}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Country"
                        />
                        {errors.country && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.country.message}</span>
                        )}
                    </label>
                </div>

                {/* Description */}
                <label className="block text-gray-700 text-sm font-bold">
                    Description
                    <textarea
                        rows={5}
                        {...register("description", {
                            required: "This field is required",
                        })}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.description.message}</span>
                    )}
                </label>

                {/* Price Per Night */}
                <label className="block text-gray-700 text-sm font-bold max-w-full sm:max-w-[50%]">
                    Price Per Night
                    <input
                        type="number"
                        min={1}
                        {...register("pricePerNight", {
                            required: "This field is required",
                        })}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Price Per Night"
                    />
                    {errors.pricePerNight && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.pricePerNight.message}</span>
                    )}
                </label>

                {/* Star Rating */}
                <label className="block text-gray-700 text-sm font-bold max-w-full sm:max-w-[50%]">
                    Star Rating
                    <select
                        {...register("starRating", {
                            required: "This field is required",
                        })}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" className="text-gray-500">Select a Rating</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num} star{num > 1 && "s"}</option>
                        ))}
                    </select>
                    {errors.starRating && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.starRating.message}</span>
                    )}
                </label>
            </div>
        </div>
    );
}

export default DetailsSection;
