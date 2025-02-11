import { Route, Routes } from "react-router-dom"
import ProductList from "./pages/ProductList"
import { lazy, Suspense } from "react"

const ProductDetail = lazy(() => import("./pages/ProductDetail"))


function App() {

  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductDetail />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
