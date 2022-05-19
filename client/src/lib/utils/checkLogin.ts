import Cookies from 'js-cookie';

export const checkLogin = () => {
	const token = Cookies.get('access_token');
	if (token) {
		return true;
	}
	return false;
};
