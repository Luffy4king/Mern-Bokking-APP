import { useQuery } from "react-query";
import { useSearchContext } from "../Context/SearchContext";
import * as apiClient from "../api-client";
import React, {useState } from "react";
import SearchResultCard from "../Components/SearchResultCard";
import Pagination from "../Components/Pagination";
import StarRatingFilter from "../Components/StarRatingFilter";
import HotelFilter from "../Components/HotelFilter";
import FacilitiesFilter from "../Components/FacilitiesFilter";
import PriceFilter from "../Components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice,setSelectedPrice] =useState<number | undefined>();
  const[ sortOption, setSortOption] = useState<string>("");
  


  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn ? search.checkIn.toISOString() : '',
    checkOut: search.checkOut ? search.checkOut.toISOString() : '',
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(
    ["searchHotels", searchParams],
    () => apiClient.searchHotels(searchParams)

  );
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
};
const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const hotelType = event.target.value;

  setSelectedHotelTypes((prevHotelType) =>
    event.target.checked
      ? [...prevHotelType, hotelType]
      : prevHotelType.filter((hotel) => hotel !== hotelType)
  );
};

const handleFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const facility = event.target.value;

  setSelectedFacilities((prevFacilities) =>
    event.target.checked
      ? [...prevFacilities, facility]
      : prevFacilities.filter((prevFacilities) => prevFacilities !== facility));
  
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* filter stars */}
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
          {/*  */}
          <HotelFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange } />

          {/*  */}
          <FacilitiesFilter  selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange}/>
         {/*  */}
         <PriceFilter selectedPrice={selectedPrice}
         onChange={(value?:number) => setSelectedPrice(value)}/>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total}Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select value={sortOption} onChange={(event) => setSortOption(event.target.value)} className="p-2 border rounded-md">
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price per Night(low to high)</option>
            <option value="pricePerNightDesc">Price per Night(high to low) </option>

          </select>

        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultCard hotel={hotel} />
        ))}
        <div>
          <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page) => setPage(page)} />
        </div>
      </div>

    </div>
  );
};

export default Search;
