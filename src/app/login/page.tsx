'use client'
import { useState, useEffect } from "react"
import jwt from 'jsonwebtoken';
import { useRouter } from "next/navigation";

export default function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('welcome to library managmemnt system');
    const router = useRouter();

    async function submitForm() {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await fetch("/api/login", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        const token = data.token;

        if (token) {
            localStorage.setItem("token", token);
            const json = jwt.decode(token) as { [key: string]: any };
            setMsg(`Welcome ${json.username}, you are ${json.admin ? 'an admin' : 'not an admin'}`);
            router.push("/");
        } else {
            setMsg("Login failed.");
        }
    }

    return (
        <div className="max-w-md mx-auto my-auto mt-20 p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg text-white">
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-bold">{msg}</h1>
  </div>

  <form onSubmit={e => e.preventDefault()} className="space-y-4">
    <div>
      <label htmlFor="username" className="block text-sm mb-1 text-gray-300">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your username"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm mb-1 text-gray-300">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your password"
      />
    </div>

    <div className="text-center">
      <input
        type="button"
        value="Login"
        onClick={submitForm}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold cursor-pointer transition duration-200"
      />
    </div>
  </form>
</div>

    );
}
