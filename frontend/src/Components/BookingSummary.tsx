import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingSummary = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Booking Details</h2>

      <div className="border-b border-gray-300 pb-4 mb-4">
        <span className="text-gray-600">Location:</span>
        <div className="font-bold text-gray-800">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex justify-between">
          <div>
            <span className="text-gray-600">Check-In</span>
            <div className="font-bold text-gray-800">{checkIn.toDateString()}</div>
          </div>
          <div>
            <span className="text-gray-600">Check-Out</span>
            <div className="font-bold text-gray-800">{checkOut.toDateString()}</div>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <span className="text-gray-600">Total length of stay:</span>
        <div className="font-bold text-gray-800">{numberOfNights} nights</div>
      </div>

      <div className="border border-gray-300 rounded-lg p-4">
        <span className="text-gray-600">Guests:</span>
        <div className="font-bold text-gray-800">{adultCount} adults, {childCount} children</div>
      </div>
    </div>
  );
};

export default BookingSummary;
