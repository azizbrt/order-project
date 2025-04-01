import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-clients";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
    const { data: hotelData} = useQuery("fetchMyhotels",apiClient.fetchMyHotels,{
        onError: () =>{}
    });
    if (!hotelData) {
        return <div>No Hotels Found</div>;
        
    }
  return (
    <div className=" flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded hover:bg-blue-500 transition-colors"
        >
          Add Hotel
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel)=>(
            <div className="flex flex-col justify-between border border-t-slate-300 rounded-lg p-8 gap-5">
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line"  >{hotel.description}</div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="border border-t-slate-300 rounded-sm p-3 flex items-center">
                    <BsMap className="mr-1" />
                    {hotel.city},{hotel.country}
                  </div>
                  <div className="border border-t-slate-300 rounded-sm p-3 flex items-center">
                    <BsBuilding className="mr-1" />
                    {hotel.type}
                  </div>
                  <div className="border border-t-slate-300 rounded-sm p-3 flex items-center">
                    <BiMoney className="mr-1" />
                    ${hotel.pricePerNight} Per Night
                  </div>
                  <div className="border border-t-slate-300 rounded-sm p-3 flex items-center">
                    <BiHotel className="mr-1" />
                    {hotel.adultCount} adults, {hotel.childCount} Children,
                  </div>
                  <div className="border border-t-slate-300 rounded-sm p-3 flex items-center">
                    <BiStar className="mr-1" />
                    {hotel.starRating} Star Rating
                  </div>
                </div>
                <span className="flex justify-end">
                  <Link className="bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded hover:bg-blue-500 transition-colors" to={`/edit-hotel/${hotel._id}`}>
                  View Details
                  </Link > 
                </span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
