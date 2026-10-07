import { NavLink, Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <nav
        style={{
          display: "flex",
          gap: "10px",
          paddingBottom: "15px",
          borderBottom: "2px solid #e2e8f0",
        }}
      >
        <NavLink
          to="/"
          style={({ isActive }) => ({
            padding: "8px 16px",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#ffffff" : "#333333",
            backgroundColor: isActive ? "#2563eb" : "#e2e8f0",
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          style={({ isActive }) => ({
            padding: "8px 16px",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#ffffff" : "#333333",
            backgroundColor: isActive ? "#2563eb" : "#e2e8f0",
          })}
        >
          Shop
        </NavLink>
      </nav>

      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </div>
  )
}
