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

        // ✅ Save username to localStorage
        localStorage.setItem("username", username);

        onLoginSuccess(username);
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
    <div className="w-[555px] h-[463px] max-xl:w-[500px] max-xl:h-[420px] max-lg:w-[420px] max-lg:h-[350px] max-md:w-[320px] max-md:h-[280px] max-sm:w-[280px] max-sm:h-[240px] transition-all duration-300 rounded-[27px] backdrop-blur-xl bg-gradient-to-tl from-gray-300 via-transparent to-gray-300 opacity-90 shadow-lg relative flex justify-center flex-col items-center px-4 py-4 gap-10">
      <div className="text-[30px] max-lg:text-[24px] max-md:text-[20px] text-shadow-black text-white text-center">
        Login
      </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-[70%] h-9 max-md:h-8 text-[16px] max-md:text-[14px] rounded-lg backdrop-blur-lg bg-gradient-to-l ring-1 ring-white from-white via-transparent to-white opacity-60 text-center text-white px-3"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-[70%] h-9 max-md:h-8 text-[16px] max-md:text-[14px] rounded-lg backdrop-blur-lg bg-gradient-to-l ring-1 ring-white from-white via-transparent to-white opacity-60 text-center text-white px-3"
      />
      <div
        onClick={handleLogin}
        className="w-[40%] max-md:w-[70%] h-10 max-md:h-9 text-[16px] max-md:text-[14px] rounded-lg text-white cursor-pointer bg-gradient-to-r from-Primary to-blue-500 transition-all duration-500 bg-[length:400%_200%] bg-left hover:bg-right flex items-center justify-center"
      >
        Sign In / Sign Up
      </div>
      {message && (
        <div
          className={`text-[14px] max-md:text-[12px] ${
            error ? "text-red-400" : "text-green-400"
          } text-center`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
