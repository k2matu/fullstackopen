import axios from "axios";
const baseUrl = "/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const getInfo = (newObject) => {
	const request = axios.put(`${baseUrl}/info`, newObject);
	return request.then((response) => response.data);
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, changedObject) => {
	const request = axios.put(`${baseUrl}/${id}`, changedObject);
	return request.then((response) => response.data);
};

const erase = (id) => {
	axios.delete(`${baseUrl}/${id}`);
	return getAll();
};

export default { getAll, create, update, erase, getInfo };
