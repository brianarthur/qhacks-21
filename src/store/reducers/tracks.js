import { TRACK_ADD, TRACK_REMOVE, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    tracks: [],
    token: null,
    attemptedLogin: false,
}

const trackAdd = (state, action) => {
    let tracksCopy = [...state.tracks];
    
    if(!tracksCopy.find(o => o.id === action.data.id)) {
        tracksCopy.push(action.data);
    };
    return updateObject(state, {
        tracks: tracksCopy,
    });
}

const trackRemove = (state, action) => {
    let tracksCopy = [...state.tracks];
    
    tracksCopy = tracksCopy.filter((o) => {
        return o.id !== action.data.id;
    });
    return updateObject(state, {
        tracks: tracksCopy,
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        attemptedLogin: true,
    });
}

const authFail = (state) => {
    return updateObject(state, {
        token: null,
        attemptedLogin: true,
    });
}

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        attemptedLogin: true,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TRACK_ADD:
            return trackAdd(state, action);
        case TRACK_REMOVE:
            return trackRemove(state, action);
        case AUTH_SUCCESS:
            return authSuccess(state, action);
        case AUTH_FAIL:
            return authFail(state);
        case AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
}

export default reducer;