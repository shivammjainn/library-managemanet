'use client'

import { useState } from "react"
import jwt from 'jsonwebtoken'
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errmsg, setErrmsg] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = async () => {
    const { username, password } = formData

    if (!username || !password) {
      setErrmsg(
        !username && !password
          ? 'Username and password are required'
          : !username
          ? 'Username is required'
          : 'Password is required'
      )
      return
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()

      if (!res.ok || !data.token) {
        setErrmsg(data.message || "Invalid credentials.")
        return
      }

      const token = data.token

      if (typeof token !== 'string' || token.split('.').length !== 3) {
        setErrmsg('Invalid token received from server')
        return
      }

      const decoded = jwt.decode(token)
      if (!decoded || typeof decoded !== 'object') {
        setErrmsg('Failed to decode token')
        return
      }

      if (decoded.admin) {
        localStorage.setItem("token", token)
        router.push("/")
      } else {
        setErrmsg("Access denied: Not an admin user")
        router.push("/login")
      }

    } catch (err) {
      setErrmsg("Network or server error occurred.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-black">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to Library Management System</h1>
      </div>

      <form onSubmit={e => e.preventDefault()} className="bg-gray-300 rounded-2xl px-4 py-8 shadow-2xl space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm mb-1">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-white border border-gray-600 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-500"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
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

        {errmsg && (
          <div className="text-center text-red-500 text-lg">
            {errmsg}
          </div>
        )}
      </form>
    </div>
  )
}
