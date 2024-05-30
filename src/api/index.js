import baseURL from './instance';

const getData = async (url, config = {}) =>
	baseURL.get(url, config).then((res) => res.data);

const postData = async (url, data, config = {}) =>
	baseURL.post(url, JSON.stringify(data), config);

const updateData = async (url, data, config) =>
	baseURL.patch(url, JSON.stringify(data), config).then((res) => res.data);

const deleteData = async (url, config) =>
	baseURL.delete(url, config).then((res) => res.data);

const postFormData = async (url, data, config) => {
	return baseURL.post(url, data, config);
};

const patchFormData = async (url, data, config) => {
	return baseURL.patch(url, data, config);
};

export {
	getData,
	postData,
	updateData,
	deleteData,
	postFormData,
	patchFormData,
};
