import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full h-[76px] absolute top-0 flex items-center z-10">
      <div
        className={`font-medium text-[20px] underline decoration-black decoration-[1.4px] underline-offset-[6px] ml-[30px] flex flex-row space-x-4 ${
          location.pathname === "/" ? "decoration-white" : "decoration-black"
        }`}
      >
        <div className="text-Primary">HomeNest</div>
      </div>

      <div className="ml-auto mr-[30px] flex flex-row items-center">
        <div className="font-medium text-[14px] cursor-pointer">
          <button
            onClick={() => navigate("/")}
            className={`cursor-pointer ${
              location.pathname === "/" ? "text-white" : "text-black"
            }`}
          >
            Schedule
          </button>
        </div>
        <div className="ml-[22px] font-medium text-[14px] text-white cursor-pointer bg-gradient-to-r select-none from-Primary to-blue-500 rounded-[28px] w-[100px] h-[31px] flex items-center justify-center transition-all duration-500 bg-[length:400%_200%] bg-left hover:bg-right">
          <button onClick={() => navigate("/Book")} className="cursor-pointer">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
