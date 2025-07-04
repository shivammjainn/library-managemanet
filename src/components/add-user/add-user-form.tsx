'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepBack, UserPlus } from 'lucide-react'
import { signupSchema } from './schema'


export default function AddUserForm() {
    const router = useRouter()
    const handleBack = () => router.back()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [nameErrors, setNameErrors] = useState<string[]>([])
    const [emailErrors, setEmailErrors] = useState<string[]>([])
    const [passwordErrors, setPasswordErrors] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setNameErrors([])
        setEmailErrors([])
        setPasswordErrors([])
        setMessage('')
        setLoading(true)

        const validation = signupSchema.safeParse(formData)
        if (!validation.success) {
            const issues = validation.error.issues

            const nameErrs: string[] = []
            const emailErrs: string[] = []
            const passwordErrs: string[] = []

            issues.forEach((issue) => {
                const field = issue.path[0]
                if (field === 'name') nameErrs.push(issue.message)
                if (field === 'email') emailErrs.push(issue.message)
                if (field === 'password') passwordErrs.push(issue.message)
            })

            setNameErrors(nameErrs)
            setEmailErrors(emailErrs)
            setPasswordErrors(passwordErrs)
            setLoading(false)
            return
        }

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                setMessage(data.message || 'Signup failed')
                return
            }

            setMessage("User created successfully!")
            setFormData({ name: '', email: '', password: '' })
            router.push('/users')

        } catch (err) {
            setMessage("Network or server error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen grid place-items-center pb-24 px-4 bg-gray-50">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border mb-10 p-6 border-gray-200">
                <div className="flex">
                    <StepBack
                        onClick={handleBack}
                        className="text-gray-800 hover:text-gray-600 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
                    />
                    <div className="w-full flex justify-center items-center">
                        <h1 className="text-3xl font-semibold text-gray-800">Add New User</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {nameErrors[0] && <p className="text-xs text-red-600 mt-1 ml-1">{nameErrors[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {emailErrors[0] && <p className="text-xs text-red-600 mt-1 ml-1">{emailErrors[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {passwordErrors[0] && <p className="text-xs text-red-600 mt-1 ml-1">{passwordErrors[0]}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-60"
                    >
                        <UserPlus />
                        {loading ? 'Adding...' : 'Add User'}
                    </button>
                </form>

                {message && (
                    <div
                        className={`mt-6 p-4 rounded-md text-center border ${message.includes('error') || message.includes('fail')
                            ? 'bg-red-50 text-red-700 border-red-300'
                            : 'bg-green-50 text-green-700 border-green-300'
                            }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}
