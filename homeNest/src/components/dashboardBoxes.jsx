export default function DashboardBoxes({
  booking_name,
  location,
  number_of_bookings,
  zipcode,
}) {
  return (
    <div className="w-[320px] h-[191px] bg-white text-black opacity-85 rounded-[6px] mx-10 cursor-grab flex items-center justify-center flex-col text-left">
      <div className="w-full translate-x-1/5">Booking name: {booking_name}</div>
      <div className="w-full translate-x-1/5">Location: {location}</div>
      <div className="w-full translate-x-1/5">
        Bookings: {number_of_bookings}
      </div>
      <div className="w-full translate-x-1/5">Zipcode: {zipcode}</div>
    </div>
  );
}
