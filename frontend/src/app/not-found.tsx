import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] bg-[#F7F7F9] dark:bg-secondary">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Page Not Found
        </h2>
        <p className="text-gray-500 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn border-none bg-primary text-white hover:bg-secondary"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
