import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3 shadow-xs">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          About
        </NavLink>
      </nav>
      <div className="p-6 max-w-5xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}