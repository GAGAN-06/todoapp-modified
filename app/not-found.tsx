import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl">Page Not Found</h2>
        <p className="text-gray-500">Oops! The page you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}