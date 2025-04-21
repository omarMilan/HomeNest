import { useEffect, useState } from "react";
import background from "../assets/backgroundLogin.png";
import Credentials from "../components/credentials";
import Dashboard from "../components/dashboard";

export default function SchedulePage() {
  const [user, setUser] = useState(null);
  const [fadeStage, setFadeStage] = useState("login"); // "login", "transition", "dashboard"
  const [bgOpacity, setBgOpacity] = useState("opacity-100");
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLoginSuccess = (username) => {
    setFadeStage("transition");

    setTimeout(() => {
      setUser(username);
      setBgOpacity("opacity-90"); // fade to 90% after login disappears
    }, 2000);

    // Delay rendering of dashboard just slightly
    setTimeout(() => {
      setFadeStage("dashboard");
      setShowDashboard(true);
    }, 2100);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Background image wrapper with animated opacity */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-[500ms] ${bgOpacity}`}
      >
        <img
          src={background}
          className="w-full h-full object-cover"
          alt="background"
        />
      </div>

      <div className="relative flex items-center justify-center w-full h-full">
        {!user && (
          <div
            className={`transition-opacity duration-[2000ms] ${
              fadeStage === "transition" ? "opacity-0" : "opacity-100"
            }`}
          >
            <Credentials onLoginSuccess={handleLoginSuccess} />
          </div>
        )}

        {showDashboard && (
          <div
            className={`transition-opacity duration-[2000ms] ${
              fadeStage === "dashboard" ? "opacity-100" : "opacity-0"
            }`}
          >
            <Dashboard username={user} />
          </div>
        )}
      </div>
    </div>
  );
}
