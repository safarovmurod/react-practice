import { applyTheme, useThemeStore } from "./store/theme"
import { lazy, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import AppLayout from "./layout/AppLayout"
import PageLoader from "./components/Shared/PageLoader"
import AuthPage from "./pages/AuthPage"
import ErrorBoundary from "./components/Shared/ErrorBoundary"
import NotFoundPage from "./pages/NotFoundPage"
const HomePage = lazy(() => import("./pages/HomePage"))
const DashboardPage = lazy(() => import("./pages/DashboardPage"))
const DebtsPage = lazy(() => import("./pages/DebtsPage"))
const ArchivePage = lazy(() => import("./pages/ArchivePage"))
const ContactsPage = lazy(() => import("./pages/ContactsPage"))
const FoldersPage = lazy(() => import("./pages/FoldersPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const DebtDetailsPage = lazy(() => import("./pages/DebtDetailsPage"))
const router = createBrowserRouter([
   {
      errorElement: <ErrorBoundary />,
      children: [
         {
            path: "/",
            element: (
               <PageLoader>
                  <HomePage />
               </PageLoader>
            ),
         },
         { path: "/login", element: <AuthPage /> },
         { path: "/register", element: <AuthPage initialRegister /> },
         {
            element: <AppLayout />,
            children: [
               {
                  path: "/dashboard",
                  element: (
                     <PageLoader>
                        <DashboardPage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/debts",
                  element: (
                     <PageLoader>
                        <DebtsPage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/debts/:id",
                  element: (
                     <PageLoader>
                        <DebtDetailsPage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/archive",
                  element: (
                     <PageLoader>
                        <ArchivePage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/contacts",
                  element: (
                     <PageLoader>
                        <ContactsPage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/folders",
                  element: (
                     <PageLoader>
                        <FoldersPage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/profile",
                  element: (
                     <PageLoader>
                        <ProfilePage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/qarz",
                  element: (
                     <PageLoader>
                        <DebtsPage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/qarz/:id",
                  element: (
                     <PageLoader>
                        <DebtDetailsPage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/archeve",
                  element: (
                     <PageLoader>
                        <ArchivePage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/tamos",
                  element: (
                     <PageLoader>
                        <ContactsPage />
                     </PageLoader>
                  ),
               },
               {
                  path: "/juzv",
                  element: (
                     <PageLoader>
                        <FoldersPage />
                     </PageLoader>
                  ),
               },
            ],
         },
         { path: "*", element: <NotFoundPage /> },
      ],
   },
])
export default function App() {
   const theme = useThemeStore((state) => state.theme)
   useEffect(() => {
      applyTheme(theme)
      if (theme !== "auto") return
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      function updateSystemTheme() {
         applyTheme("auto")
      }
      systemTheme.addEventListener("change", updateSystemTheme)
      return () => systemTheme.removeEventListener("change", updateSystemTheme)
   }, [theme])
   return <RouterProvider router={router} />
}
