import { useUserStore } from "../store/user"
import { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router"
import Sidebar from "../components/Layout/Sidebar"
import Header from "../components/Layout/Header"
import BottomMenu from "../components/Layout/BottomMenu"
import QuickAddMenu from "../components/Dashboard/QuickAddMenu"
export default function AppLayout() {
   const [menuCollapsed, setMenuCollapsed] = useState(false)
   const getUser = useUserStore((state) => state.getUser)
   useEffect(() => {
      if (localStorage.getItem("token")) getUser().catch((error) => console.error(error))
   }, [getUser])
   if (!localStorage.getItem("token")) return <Navigate to="/login" replace />
   return (
      <div className={menuCollapsed ? "layout menu-collapsed" : "layout"}>
         <Sidebar />
         <div className="body">
            <Header onMenuClick={() => setMenuCollapsed(!menuCollapsed)} />
            <main className="content">
               <Outlet />
            </main>
         </div>
         <BottomMenu />
         <QuickAddMenu />
      </div>
   )
}
