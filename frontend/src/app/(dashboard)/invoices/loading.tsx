export default function InvoicesLoading() {
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] bg-[#F7F7F9] dark:bg-secondary">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p className="text-gray-500 text-sm">Loading invoices...</p>
      </div>
    </div>
  );
}
