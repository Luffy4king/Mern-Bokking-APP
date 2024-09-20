import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfo from "../forms/GuestInfoForms/GuestInfo";

const Details = () => {
    const { hotelId } = useParams();
    const { data: hotel } = useQuery(
        "fetchHotelById",
        () => apiClient.fetchHotelById(hotelId || ""),
        {
            enabled: !!hotelId,
        }
    );

    if (!hotel) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-10 p-4 lg:p-8 bg-gray-50">
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <span className="flex">
                        {Array.from({ length: hotel.starRating }).map((_, index) => (
                            <AiFillStar key={index} className="fill-yellow-400" />
                        ))}
                    </span>
                    <h1 className="font-bold text-3xl lg:text-4xl">{hotel.name}</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {hotel.imageUrls.map((image, index) => (
                    <div key={index} className="h-[300px] shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={image}
                            alt={hotel.name}
                            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {hotel.facilities.map((facility, index) => (
                    <div
                        key={index}
                        className="border border-slate-300 rounded-md p-4 text-center transition-colors duration-200 hover:bg-slate-100 hover:border-slate-400"
                    >
                        {facility}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                <div className="whitespace-pre-line leading-relaxed text-gray-700">
                    {hotel.description}
                </div>
                <div className="h-fit p-6 rounded-lg shadow-lg">
                    <GuestInfo pricePerNights={hotel.pricePerNight} hotelId={hotel._id} />
                </div>
            </div>
        </div>
    );
};

export default Details;
