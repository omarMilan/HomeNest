export default function DashboardBoxes() {
  return (
    <div className="w-[320px] h-[191px] bg-white text-black opacity-85 rounded-[6px] mx-10 cursor-grab flex items-center justify-center flex-col text-left p-4">
      <div className="w-full translate-x-1/4">Booking name:</div>
      <div className="w-full translate-x-1/4">Location:</div>
      <div className="w-full translate-x-1/4">Number of bookings:</div>
    </div>
  );
}
