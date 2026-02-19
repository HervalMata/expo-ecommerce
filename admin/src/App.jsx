import { useAuth } from "@clerk/clerk-react"
import PageLoader from "./components/PageLoader";
import { Route, Routes } from "react-router";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <PageLoader />

  return (
    <Routes>
      <Route path="/login" element={isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />} />
      <Route path="/" element={isSignedIn ? <DashboardLayout /> : <Navigate to={"/login"} />}>
        <Route index element={<Navigate to={"/dashboard"} />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
      </Route>
    </Routes>
  )
}

export default App
