export default function addBook() {
  return (
    <div className="max-w-xl mx-auto p-6 text-white border border-white my-4 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
      <form
        action="/api/add-book"
        method="POST"
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          required
          className="w-full p-2 rounded border border-white"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full p-2 rounded border border-white"
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          required
          className="w-full p-2 rounded border border-white"
        />
        <div className="flex justify-center">
<button
          type="submit"
          className="px-4 py-2 bg-white hover:bg-gray-400 rounded text-black"
        >
          Submit
        </button>
        </div>
        
      </form>
    </div>
  );
}
