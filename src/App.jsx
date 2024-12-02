import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoudPage from "./pages/NotFoudPage";
import Dashboard from "./pages/admin/Dashboard";
import ProductTable from "./pages/admin/ProductTable";
import ProductForm from "./pages/admin/ProductForm";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />

				{/* nested router */}
				<Route path="/admin" element={<Dashboard />}>
					<Route index element={<Dashboard />} />
					<Route path="products" element={<ProductTable />} />
					<Route path="products/add" element={<ProductForm />} />
					<Route path="products/update/:id" element={<ProductForm />} />
				</Route>

				<Route path="*" element={<NotFoudPage />} />
			</Routes>
		</>
	);
}

export default App;
