'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddBookForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

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

    try {
      const response = await fetch('/api/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage('Book added successfully!')
        setFormData({ name: '', description: '', author: '' })
        
        
          router.push('/')
        
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.message || 'Failed to add book'}`)
      }
    } catch (error) {
      setMessage('Network error occurred')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto p-6 text-black my-4 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Book Name"
          required
          className="w-full p-2 rounded border border-black"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 rounded border border-black"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author Name"
          required
          className="w-full p-2 rounded border border-black"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            
            className="px-4 py-2 border border-black bg-white hover:bg-gray-400 rounded text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add book
          </button>
        </div>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded text-center ${
          message.includes('Error') 
            ? 'bg-red-100 text-red-700 border border-red-300' 
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}



// export default function AddBookForm(){
//   const [bookName,setBookName]=useState('');
//   const [desc,setDesc]=useState('');
//   const [authorName,setAuthorName]=useState('');

//   async function addBook(){
//     var formDataa=new FormData();
//     formDataa.append("book name",bookName);
//     formDataa.append("AUTHOR name",authorName);
//     formDataa.append("description",desc);
//     console.log(formDataa);

//     const res=await fetch("/api/add-book"),{
//       method:"POST",
//       body:formDataa,
//     }

//   }


//   return(
//     <div>
//       <form onSubmit={e=>e.preventDefault()}>
//         <label>Book name</label>
//         <input type="text" name="book name" value={bookName} onChange={e=>setBookName(e.target.value)}/>
//         <label>description</label>
//         <input type="text" name="book name" value={desc} onChange={e=>setDesc(e.target.value)}/>
//         <label>Author Name</label>
//         <input type="text" name="book name" value={authorName} onChange={e=>setAuthorName(e.target.value)}/>
//         <input type="button" value="add book" onClick={addBook}/>
//       </form>
//     </div>
//   )
// }