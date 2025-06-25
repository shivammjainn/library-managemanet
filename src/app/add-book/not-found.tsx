import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-xl mt-4 text-gray-700">Oops! Page not found.</p>
      <p className="text-md mt-2 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Go back home
      </Link>
    </div>
  );
}