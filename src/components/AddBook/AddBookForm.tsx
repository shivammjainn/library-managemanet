'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, StepBack } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { z } from 'zod'

const bookSchema = z.object({
  name: z
    .string()
    .min(1, "Book name is required")
    .refine(val => /^[A-Za-z]/.test(val), {
      message: 'Book name must start with a letter',
    }),

  description: z
    .string()
    .min(1, 'Description is required')
    .refine(val => /^[A-Za-z]/.test(val), {
      message: 'Description must start with a letter',
    }),

  author: z
    .string()
    .min(1, 'Author name is required')
    .refine(val => /^[A-Za-z]/.test(val), {
      message: 'Author name must start with a letter',
    }),

  detail: z
    .string()
    .min(1, 'Detail is required')
    .refine(val => /^[A-Za-z]/.test(val), {
      message: 'Detail must start with a letter',
    }),

  available: z.boolean(),
})

export default function AddBookForm() {

  const router = useRouter()
  const handleBack = () => router.back()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author: '',
    detail: '',
    available: false,
  })

  const [nameErrors, setNameErrors] = useState<string[]>([])
  const [descriptionErrors, setDescriptionErrors] = useState<string[]>([])
  const [authorErrors, setAuthorErrors] = useState<string[]>([])
  const [detailErrors, setDetailErrors] = useState<string[]>([])
  const [_loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    setNameErrors([])
    setDescriptionErrors([])
    setAuthorErrors([])
    setDetailErrors([])

    const validation = bookSchema.safeParse(formData)
    if (!validation.success) {
      const issues = validation.error.issues

      const nameErrs: string[] = []
      const descErrs: string[] = []
      const authorErrs: string[] = []
      const detailErrs: string[] = []

      issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'name') nameErrs.push(issue.message)
        if (field === 'description') descErrs.push(issue.message)
        if (field === 'author') authorErrs.push(issue.message)
        if (field === 'detail') detailErrs.push(issue.message)
      })

      setNameErrors(nameErrs)
      setDescriptionErrors(descErrs)
      setAuthorErrors(authorErrs)
      setDetailErrors(detailErrs)

      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/add-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage('Book added successfully!')
        setFormData({ name: '', description: '', author: '', detail: '', available: false })
        router.push('/')
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.message}`)
      }
    } catch (error) {
      setMessage('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen grid place-items-center pb-24 px-4 bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border mb-10 p-6 border-gray-200">
        <div className="flex">
          <div className="flex items-center">
            <StepBack
              onClick={handleBack}
              className="text-gray-800 hover:text-gray-600 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <h1 className="text-3xl font-semibold text-gray-800">Add a New Book</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">

          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Book Name"
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 `}
            />
            {nameErrors[0] && (
              <p className="text-xs text-red-600 mt-1 ml-1">{nameErrors[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Short Description"
              rows={3}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {descriptionErrors[0] && (
              <p className="text-xs text-red-600 mt-1 ml-1">{descriptionErrors[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Author Name"
              className={`w-full px-4 py-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500`}
            />
            {authorErrors[0] && (
              <p className="text-xs text-red-600 mt-1 ml-1">{authorErrors[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              placeholder="Enter Short detail"
              rows={3}
              className={`w-full px-4 py-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500`}
            />
            {detailErrors[0] && (
              <p className="text-xs text-red-600 mt-1 ml-1">{detailErrors[0]}</p>
            )}
          </div>

          <div className="flex items-center mb-3">
            <Checkbox
              checked={formData.available}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  available: Boolean(checked),
                }))
              }
              className="border border-black mr-2"
            />
            <label>Is this book available</label>
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="flex px-3 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              <Plus />
              Add Book
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-md text-center border ${message.includes('error')
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
