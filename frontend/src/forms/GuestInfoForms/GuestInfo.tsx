import DatePicker from "react-datepicker";

import { useForm } from "react-hook-form";
import { useSearchContext } from "../../Context/SearchContext";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

type Props = {
    hotelId: string;
    pricePerNights: number;
}

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}

const GuestInfo = ({ hotelId, pricePerNights }: Props) => {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();

    const { watch, handleSubmit, register, setValue, formState: { errors } } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        }
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(minDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate("/sign-in", { state: { from: location } });
    }

    const onSubmit = (data: GuestInfoFormData) => {
    
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`);
    }

    return (
        <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg gap-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">${pricePerNights} per night</h3>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) => setValue("checkIn", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            wrapperClassName="w-full"
                        />
                    </div>
                    <div>
                        <DatePicker
                            required
                            selected={checkOut}
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn || minDate}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            wrapperClassName="w-full"
                        />
                    </div>
                    <div className="flex bg-white gap-4">
                        <label className="flex items-center w-full text-gray-700">
                            Adults:
                            <input
                                className="w-full bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold ml-2"
                                type="number"
                                min={1}
                                max={20}
                                {...register("adultCount", {
                                    required: "This field is required",
                                    min: { value: 1, message: "Must be at least 1 adult" },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className="flex items-center w-full text-gray-700">
                            Children:
                            <input
                                className="w-full bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold ml-2"
                                type="number"
                                min={0}
                                max={20}
                                {...register("childCount", { valueAsNumber: true })}
                            />
                        </label>
                    </div>
                    {errors.adultCount && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.adultCount.message}
                        </span>
                    )}
                    {isLoggedIn ? (
                        <button className="w-full bg-blue-600 text-white p-3 rounded-md font-bold hover:bg-blue-500 transition duration-200 text-lg">
                            Book Now
                        </button>
                    ) : (
                        <button className="w-full bg-blue-600 text-white p-3 rounded-md font-bold hover:bg-blue-500 transition duration-200 text-lg">
                            Sign in to Book
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default GuestInfo;
