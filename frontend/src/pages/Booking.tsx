
import { useQuery } from 'react-query'
import *  as apiClient from '../api-client'
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../Context/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingSummary from '../Components/BookingSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../Context/AppContext';

const Booking = () => {
  const {stripePromise} = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0)
  ///number of nights logic
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights))

    }
  }, [search.checkIn, search.checkOut])
   const {data:paymentIntentData} = useQuery("createPaymentIntent",() =>
  apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
   {
enabled: !!hotelId && numberOfNights > 0,
   }
  )
  //////
  const { data: hotel } = useQuery("fetchHotelById", () =>
    apiClient.fetchHotelById(hotelId as string), {
    enabled: !!hotelId,
  }
  );

  const { data: currentUser } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

  if (!hotel) {
    return <div>Loading...</div>
  }

  return (
    <div className='grid grid-cols-[1fr_2fr]'>
      <BookingSummary 
      checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount}
      childCount={search.childCount} hotel={hotel} numberOfNights={numberOfNights}  />
      
      {currentUser && paymentIntentData &&
       ( 
       <Elements stripe={stripePromise} options={{
        clientSecret:paymentIntentData.clientSecret,
       }}> 
      <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
       </Elements>
      
      
      )
      };

    </div>
  )
}

export default Booking
