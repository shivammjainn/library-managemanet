'use client'

import { useState } from "react"
import jwt from 'jsonwebtoken'
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(val => /[^A-Za-z0-9]/.test(val), {
      message: 'Password must contain at least one special character'
    }),
})
const signupSchema = loginSchema.extend({
  name: z.string().min(4, 'Minimum 4 letters are required'),
})
export default function LoginPage() {
  const [nameErrors, setNameErrors] = useState<string[]>([])
  const [emailErrors, setEmailErrors] = useState<string[]>([])
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errmsg, setErrmsg] = useState('')
  const [newUser, setNewUser] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = async () => {
    const { email, password } = formData
    setEmailErrors([])
    setPasswordErrors([])
    const validation = loginSchema.safeParse(formData)
    if (!validation.success) {
      const issues = validation.error.issues

      const emailErrs: string[] = []
      const passwordErrs: string[] = []
      issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'email') emailErrs.push(issue.message)
        if (field === 'password') passwordErrs.push(issue.message)

      })
      setEmailErrors(emailErrs)
      setPasswordErrors(passwordErrs)
      return
    }


    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      console.log("data from DB to FE", data);
      if (data.error) {
        setErrmsg(data.error)
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
        window.location.href = '/';
      } else {
        localStorage.setItem("token", token)
        window.location.href = '/';
      }

    } catch (err) {
      setErrmsg("Network or server error occurred.")
    }
  }

  const SignUpForm = async () => {
    const { name, email, password } = formData;
    setNameErrors([])
    setEmailErrors([])
    setPasswordErrors([])
    const validation = signupSchema.safeParse(formData)
    if (!validation.success) {
      const issues = validation.error.issues

      const emailErrs: string[] = []
      const passwordErrs: string[] = []
      const nameErrs: string[] = []
      issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'name') nameErrs.push(issue.message)
        if (field === 'email') emailErrs.push(issue.message)
        if (field === 'password') passwordErrs.push(issue.message)

      })
      setNameErrors(nameErrs)
      setEmailErrors(emailErrs)
      setPasswordErrors(passwordErrs)
      return
    }


    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setErrmsg("user already exists click on sign in")
        return
      }
      const token = data.token;
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
        window.location.href = '/';
      } else {
        localStorage.setItem("token", token)
        window.location.href = '/';
      }
    } catch (err) {
      setErrmsg("Network or server error occurred.")
    }

  }

  return (
    <div className="h-screen grid place-items-center bg-gray-50 pb-28 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-200 p-8 ">
        <div className="mb-6 text-center">
          {newUser && (<h1 className="text-3xl font-bold text-gray-800">📚 Library Registration
          </h1>)}
          {!newUser && (<h1 className="text-3xl font-bold text-gray-800">📚 Library Login
          </h1>)}

          <p className="text-sm text-gray-500 mt-1">Welcome to the Library Management System</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="">
          {newUser && (
            <div className="my-5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="name"
                placeholder="Enter your Name"
                className="w-full px-4 py-2   rounded-lg focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                required />

              {nameErrors[0] && (
                <p className="text-xs text-red-600 mt-1 ml-2">{nameErrors[0]}</p>
              )}
            </div>
          )}
          <div className="my-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full px-4 py-2   rounded-lg focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {emailErrors[0] && (
              <p className="text-xs text-red-600 mt-1 ml-2">{emailErrors[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {passwordErrors[0] && (
              <p className="text-xs text-red-600 mt-1 ml-2">{passwordErrors[0]}</p>
            )}
          </div>
          <div className="h-6 my-2">
            {errmsg && (
              <div className="text-center text-red-600 text-sm font-medium">{errmsg}</div>
            )}
          </div>
          <div className="text-center ">
            {
              !newUser && (
                <button
                  type="submit"
                  onClick={submitForm}
                  className="w-full mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-sm transition duration-200"
                >
                  Login
                </button>
              )
            }

            {newUser && (
              <button
                type="submit"
                onClick={SignUpForm}
                className="w-full bg-blue-500 mb-4 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-sm transition duration-200"
              >
                Register
              </button>
            )}

            <div className="h-6">
              {!newUser && (
                <div className="flex justify-center ">
                  <div>
                    <h1 className="mr-1" >Don't have an account?
                    </h1>
                  </div >
                  <div>
                    <span className="font-semibold">
                      <button className="text-center underline hover:cursor-pointer w-full text-blue-500" onClick={() => {
                        setNewUser(true),
                          setErrmsg('')
                      }}>
                        Register
                      </button>
                    </span>
                  </div>
                </div>

              )}
              {newUser && (
                <div className="flex justify-center ">
                  <div>
                    <h1 className="mr-1" >Already have an account?
                    </h1>
                  </div >
                  <div>
                    <span className="font-semibold">
                      <button className="text-center underline hover:cursor-pointer w-full text-blue-500" onClick={() => {
                        setNewUser(false),
                          setErrmsg('')
                      }}>
                        Sign in
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </form>
      </div>
    </div>

  )
}
