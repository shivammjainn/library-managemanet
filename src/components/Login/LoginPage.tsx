'use client'
import { useState, useEffect } from "react"
import jwt from 'jsonwebtoken';
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('welcome to library managmemnt system');
    const [errmsg,setErrmsg]=useState('');
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
            if(json.admin){
              setMsg(`Welcome ${json.username}, you are ${json.admin ? 'an admin' : 'not an admin'}`);
              router.push("/");
            }
            else{
              setErrmsg( `username is admin and password is admin `)
              router.push('/login')
            }
        } else {
            setMsg("Login failed.");
        }
    }

    return (
        <div className="max-w-md mx-auto my-auto mt-20 p-6  text-black">
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-bold">{msg}</h1>
  </div>

  <form onSubmit={e => e.preventDefault()} className=" bg-gray-300 rounded-2xl px-4 py-8 shadow-2xl space-y-4">
    <div>
      <label htmlFor="username" className="block text-sm mb-1 text-blaack">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full px-3 py-2 rounded bg-white border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-500"
        placeholder="Enter your username"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm mb-1 text-black">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-3 py-2 rounded bg-white border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-500"
        placeholder="Enter your password"
      />
    </div>

    <div className="text-center">
      <input
        type="button"
        value="Login"
        onClick={submitForm}
        className="px-6 py-2 bg-green-600 hover:bg-green-900 rounded text-black font-semibold cursor-pointer transition duration-200"
      />
    </div>
    <div className="text-center text-red-500 text-lg">
      {errmsg}
    </div>
  </form>
</div>

    );
}
