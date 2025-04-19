import background from "../assets/backgroundLogin.png";
import Credentials from "../components/credentials";

export default function SchedulePage() {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        src={background}
        className="absolute inset-0 w-full h-full object-cover"
        alt="background"
      />
      <div className="relative  flex items-center justify-center w-full h-full">
        <Credentials />
      </div>
    </div>
  );
}
