import React, { useEffect, useState } from "react";
import { getAll, removeById } from "../../services";
import { Link } from "react-router-dom";

const ProductTable = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		(async () => {
			const data = await getAll("/products");
			setProducts(data);
		})();
	}, []);

	const handleRemove = async (id) => {
		console.log(id);

		const res = await removeById(`/products`, id);
		if (res.status === 200) {
			const newProducts = products.filter((item) => item.id !== id);
			setProducts(newProducts);
		}
	};
	return (
		<>
			<h1>Quan ly san pham</h1>
			<Link to={`/admin/products/add`}>Thêm sản phẩm mới</Link>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products ? (
						products.map((item) => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.title}</td>
								<td>{item.price}</td>
								<td>{item?.description || "Đang cập nhật"}</td>
								<td>
									<button className="btn btn-danger" onClick={() => handleRemove(item.id)}>
										Remove
									</button>
									<Link to={`/admin/products/update/${item.id}`} className="btn btn-warning">
										Update
									</Link>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={5}>Không có sản phẩm nào</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};

export default ProductTable;
