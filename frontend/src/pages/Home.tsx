import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../Components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
          Latest Destinations
        </h2>
        <p className="text-lg text-gray-600">
          Explore our most recently added destinations, tailored just for you.
        </p>
      </div>

      {/* Hotels Grid */}
      <div className="space-y-12">
        {/* Top Row */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
