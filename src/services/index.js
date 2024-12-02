import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

export const getAll = async (path) => {
	try {
		const { data } = await instance.get(path);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getById = async (path, id) => {
	try {
		const { data } = await instance.get(`${path}/${id}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const removeById = async (path, id) => {
	try {
		const res = await instance.delete(`${path}/${id}`);
		console.log(res);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const createNew = async (path, dataBody) => {
	try {
		const { data } = await instance.post(`${path}`, dataBody);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const updateById = async (path, id, dataBody) => {
	try {
		const { data } = await instance.patch(`${path}/${id}`, dataBody);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default instance;
