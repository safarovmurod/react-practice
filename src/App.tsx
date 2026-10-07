import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./pages/Home"
import Shop from "./components/Shop"
import Layout from "./layout/Layout"

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
      ],
    },
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
