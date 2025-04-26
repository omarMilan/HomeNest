import { useEffect, useState } from "react";
import BookHeader from "../components/bookHeader";

export default function BookPage() {
  const [listings, setListings] = useState([]);
  const [zipcodeInput, setZipcodeInput] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async (zipcode = "") => {
    try {
      const url = zipcode
        ? `http://localhost:3001/listings-by-zipcode?zipcode=${zipcode}`
        : `http://localhost:3001/listings-all`;

      const response = await fetch(url);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Failed to fetch listings", error);
    }
  };

  const handleSearch = () => {
    fetchListings(zipcodeInput.trim());
  };

  const handleBooking = async (booking) => {
    try {
      await fetch("http://localhost:3001/book-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_name: booking.booking_name,
          location: booking.location,
          zipcode: booking.zipcode,
        }),
      });

      // Refetch updated listings
      fetchListings(zipcodeInput.trim());
    } catch (error) {
      console.error("Failed to book listing", error);
    }
  };

  return (
    <div className="relative min-h-screen w-screen">
      <BookHeader
        zipcodeInput={zipcodeInput}
        setZipcodeInput={setZipcodeInput}
        handleSearch={handleSearch}
      />

      {/* Listings */}
      <div className="mt-10">
        <div className="flex flex-col">
          <div className="ml-[80px] text-[48px] font-medium">Destinations</div>

          <div className="flex flex-wrap gap-6 justify-center mt-[40px]">
            {listings.length > 0 ? (
              listings.map((listing, index) => (
                <div
                  key={index}
                  onClick={() => handleBooking(listing)}
                  className="w-[267px] h-[200px] bg-gray-300 hover:bg-Primary duration-300 transition-all rounded-[3px] flex flex-col items-center justify-center p-4 text-black cursor-pointer"
                >
                  <div>Booking name: {listing.booking_name}</div>
                  <div>Location: {listing.location}</div>
                  <div>Zipcode: {listing.zipcode}</div>
                  <div>Posted by: {listing.owner}</div>
                  <div>Bookings: {listing.number_of_bookings}</div>
                </div>
              ))
            ) : (
              <div className="text-white text-[20px] mt-10">
                No listings found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
