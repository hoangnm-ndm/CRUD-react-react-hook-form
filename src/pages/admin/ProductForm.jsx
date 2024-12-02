import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createNew, getById, updateById } from "../../services";
import { useNavigate, useParams } from "react-router-dom";

const productSchema = z.object({
	title: z.string().min(6),
	price: z.number().positive(),
	description: z.string().optional(),
});

const ProductForm = () => {
	const { id } = useParams();
	const nav = useNavigate();
	const {
		handleSubmit,
		formState: { errors },
		register,
		reset,
	} = useForm({
		resolver: zodResolver(productSchema),
	});

	useEffect(() => {
		(async () => {
			if (id) {
				const data = await getById(`/products`, id);
				reset(data);
			}
		})();
	}, []);

	const onSubmit = async (product) => {
		if (id) {
			//logic update
			const data = await updateById("/products", id, product);
			console.log(data);
		} else {
			//logic add
			const data = await createNew("/products", product);
			console.log(data);
		}

		if (confirm("Go to products page?")) {
			nav("/admin/products");
		} else {
			reset({ title: "", price: 0, description: "" });
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>{id ? "Sửa" : "Thêm"} sản phẩm</h1>
				<div className="form-group mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input className="form-control" type="text" placeholder="title" {...register("title", { required: true })} />
					{errors?.title && <p className="text-danger">{errors.title?.message}</p>}
				</div>

				<div className="form-group mb-3">
					<label htmlFor="price" className="form-label">
						price
					</label>
					<input
						className="form-control"
						type="number"
						placeholder="price"
						{...register("price", { required: true, valueAsNumber: true })}
					/>
					{errors?.price && <p className="text-danger">{errors.price?.message}</p>}
				</div>

				<div className="form-group mb-3">
					<label htmlFor="description" className="form-label">
						description
					</label>
					<textarea
						className="form-control"
						type="text"
						placeholder="description"
						{...register("description", { required: true })}
					/>
					{errors?.description && <p className="text-danger">{errors.description?.message}</p>}
				</div>

				<div className="form-group mb-3">
					<button className="btn btn-secondary" onClick={() => reset()}>
						Nhập lại
					</button>

					<button className="btn btn-primary">{id ? "Sửa" : "Thêm"} sản phẩm</button>
				</div>
			</form>
		</>
	);
};

export default ProductForm;
