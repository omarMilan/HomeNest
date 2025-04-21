import { useState } from "react";

export default function Credentials({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError(false);
        setMessage(data.message);
        onLoginSuccess(username); // send username to parent
      } else {
        setError(true);
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      setError(true);
      setMessage("Server is down or unreachable");
    }
  };

  return (
    <div className="w-[555px] h-[463px] rounded-[27px] backdrop-blur-xl bg-gradient-to-tl from-gray-300 via-transparent to-gray-300 opacity-90 shadow-lg relative flex gap-y-[55px] justify-center flex-col items-center">
      <div className="text-[36px] text-shadow-black text-white text-center">
        Login
      </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-[70%] h-10 rounded-[12px] backdrop-blur-lg bg-gradient-to-l ring-1 ring-white from-white via-transparent to-white opacity-60 text-center text-white text-[18px] px-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-[70%] h-10 rounded-[12px] backdrop-blur-lg bg-gradient-to-l ring-1 ring-white from-white via-transparent to-white opacity-60 text-center text-white text-[18px] px-4"
      />
      <div
        onClick={handleLogin}
        className="w-[45%] h-12 text-[18px] rounded-[12px] text-white cursor-pointer bg-gradient-to-r select-none from-Primary to-blue-500 transition-all duration-500 bg-[length:400%_200%] bg-left hover:bg-right flex items-center justify-center"
      >
        Sign In / Sign Up
      </div>
      {message && (
        <div
          className={`text-[16px] ${
            error ? "text-red-400" : "text-green-400"
          } text-center`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
