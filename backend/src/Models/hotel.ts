import mongoose from 'mongoose';
import { BookingType, HotelType } from '../shared/types';

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName:{type: 'string',required: true},
  lastName:{type: 'string',required: true},
  email:{type: 'string',required: true},
  adultCount:{type: 'number',required: true},
  childCount:{type: 'number',required: true},
  checkIn:{type: Date,required: true},
  checkOut:{type: Date,required: true},
  userId:{type: 'string',required: true},
  totalCost:{type: 'number',required: true},
});
const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema],  // 1:n relationship with Booking model  // Mongoose automatically creates an array of bookingIds. We need to reference the booking model in the schema to use it in the array.  // Mongoose creates a virtual property called "bookings" that returns an array of Booking objects based on the bookingIds.  // Mongoose also creates a method called "addBooking" that adds a new booking to the bookings array.  // Mong
  
});

const Hotel = mongoose.model<HotelType>('Hotel', hotelSchema);

export default Hotel;
