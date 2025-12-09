"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "../data/users";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    // cek user hardcode
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Email atau password salah");
      return;
    }

    // simpan session lokal
    localStorage.setItem("token", "login_success_token");
    localStorage.setItem("user", JSON.stringify(user));

    router.push("/sales/performance");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-xl rounded-xl w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-6"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
