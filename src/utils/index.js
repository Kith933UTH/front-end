export function convertToTwoDigit(number) {
	if (number < 10) {
		return '0' + number;
	} else {
		return number.toString();
	}
}
export function FormatNumber(number) {
	const numberString = number.toString();
	// Tách phần nguyên và phần thập phân
	const parts = numberString.split('.');
	const integerPart = parts[0];
	// Thêm dấu chấm vào phần nguyên
	const formattedString = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	// Kết hợp phần nguyên và phần thập phân (nếu có)
	return formattedString;
}

export function formatTimestamp(timestamp) {
	const date = new Date(timestamp);

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	const formattedDate = `${month} ${day}, ${year}`;
	return formattedDate;
}

export function formatTimestampWithTime(timestamp) {
	const date = new Date(timestamp);

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	const hours = convertToTwoDigit(date.getHours());
	const minutes = convertToTwoDigit(date.getMinutes());
	const seconds = convertToTwoDigit(date.getSeconds());

	const formattedDate = `${hours}:${minutes}:${seconds} ${month} ${day}, ${year}`;
	return formattedDate;
}

export function formatTimestampToValue(timestamp) {
	const date = new Date(timestamp);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

export function ScrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function capitalizeFirstLetter(word) {
	if (typeof word !== 'string' || word.length === 0) {
		return '';
	}

	return word.charAt(0).toUpperCase() + word.slice(1);
}
export function isNumber(input) {
	// const number = parseInt(input);
	if (input === '') return false;
	return !isNaN(input);
}

export function removeDuplicates(array) {
	const uniqueArray = [];

	// Duyệt qua mảng ban đầu
	for (let i = 0; i < array.length; i++) {
		if (uniqueArray.indexOf(array[i]) === -1) {
			// Nếu phần tử chưa tồn tại trong mảng uniqueArray, thêm vào
			uniqueArray.push(array[i]);
		}
	}

	return uniqueArray;
}

export function ConvertTimestampToDateOfWith(timestamp) {
	// Tạo một đối tượng Date từ timestamp (đơn vị là milliseconds)
	const date = new Date(timestamp);

	// Tạo một mảng các tên ngày trong tuần
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	// Lấy giờ, phút và ngày trong tháng từ đối tượng Date
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const day = date.getDate();
	const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0

	// Lấy tên ngày trong tuần từ mảng daysOfWeek
	const dayOfWeek = daysOfWeek[date.getDay()];

	// Tạo định dạng "dd/mm/yyyy" từ ngày và tháng
	const formattedDate =
		day.toString().padStart(2, '0') +
		'/' +
		month.toString().padStart(2, '0') +
		'/' +
		date.getFullYear();

	// Kết hợp các thành phần lại thành định dạng cuối cùng
	const formattedTimestamp =
		hours + ':' + minutes + ' ' + dayOfWeek + ', ' + formattedDate;

	return formattedTimestamp;
}

export function convertTimestampToRelativeTime(timestamp) {
	const date = new Date(timestamp);
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const secondsAgo = currentTimestamp - Math.floor(date.getTime() / 1000);
	const minutesAgo = Math.floor(secondsAgo / 60);
	const hoursAgo = Math.floor(minutesAgo / 60);
	const daysAgo = Math.floor(hoursAgo / 24);
	const monthsAgo = Math.floor(daysAgo / 30);
	const yearsAgo = Math.floor(monthsAgo / 12);

	if (yearsAgo >= 1) {
		return yearsAgo === 1 ? '1 year ago' : yearsAgo + ' years ago';
	} else if (monthsAgo >= 1) {
		return monthsAgo === 1 ? '1 month ago' : monthsAgo + ' months ago';
	} else if (daysAgo >= 1) {
		return daysAgo === 1 ? '1 day ago' : daysAgo + ' days ago';
	} else if (hoursAgo >= 1) {
		return hoursAgo === 1 ? '1 hour ago' : hoursAgo + ' hours ago';
	} else if (minutesAgo >= 1) {
		return minutesAgo === 1 ? '1 minute ago' : minutesAgo + ' minutes ago';
	} else {
		return 'just now';
	}
}

export function isTimestampPast(timestamp) {
	const currentDate = new Date().setHours(0, 0, 0, 0);
	const timestampDate = new Date(timestamp).setHours(0, 0, 0, 0);

	return timestampDate < currentDate;
}

export function debounce(callback, delay) {
	let timerId;

	return function (...args) {
		clearTimeout(timerId);

		timerId = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}
