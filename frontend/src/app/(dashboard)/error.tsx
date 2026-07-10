"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] bg-[#F7F7F9] dark:bg-secondary">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <h2 className="text-2xl font-bold text-rose-500">
          Something went wrong!
        </h2>
        <p className="text-gray-500 max-w-md">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="btn border-none bg-primary text-white hover:bg-secondary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
