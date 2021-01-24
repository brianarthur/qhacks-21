import { TRACK_ADD, TRACK_REMOVE, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/actionTypes';

export const tracksAdd = data => {
	return {
		type: TRACK_ADD,
		data
	};
};

export const tracksRemove = data => {
	return {
		type: TRACK_REMOVE,
		data
	};
};

export const authSuccess = token => {
	return {
		type: AUTH_SUCCESS,
		token
	};
}

export const authLogout = () => {
	return {
		type: AUTH_LOGOUT,
	};
}

export const login = (token) => {
	return dispatch => {
		const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
		localStorage.setItem("expirationDate", expirationDate);
		
		dispatch(authSuccess(token));
		dispatch(checkAuthTimeout(3600));
	}
}

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const logout = () => {
	return dispatch => {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationDate");
		dispatch(authLogout());
	}
}

export const autoLogin = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if (token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
			dispatch(logout());
			} else {
			dispatch(authSuccess(token));
			dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
  };