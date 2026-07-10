import Navbar from "@/components/layouts/Navbar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Sidebar from "@/components/layouts/Sidebar";

// Metadata for the dashboard section
export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="drawer lg:drawer-open dark:bg-secondary">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="overflow-hidden drawer-content flex flex-col items-center justify-center dark:bg-secondary">
          <Navbar />
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu w-72 min-h-full bg-secondary dark:bg-neutral text-accent">
            <Sidebar />
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
}
