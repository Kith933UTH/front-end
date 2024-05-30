import axios from 'axios';

// Tạo một instance với các đối số truyền vào riêng biệt
const baseURL = axios.create({
	baseURL: 'http://localhost:3500', //API dùng chung cho toàn bộ dự án
	credentials: 'include',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default baseURL;
