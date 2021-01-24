import { TRACK_ADD, TRACK_REMOVE, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    tracks: [],
    // play: null,
    token: null,
    play: {
        playlistID: "7CwiEEV7ALUvnulFfOZOCi",
        tracks: {
            "0JGncW3IHWA9TFQyhgLESH": "https://www.youtube.com/embed/VqjkxWb68Bg?start=93s&end=153",
            "0eBXyY4SatzpE7opnzgXvz": "https://www.youtube.com/embed/MS82JAkBkDY?start=121s&end=181",
            "0nbXyq5TXYPCO7pr3N8S4I": "https://www.youtube.com/embed/UNZqm3dxd2w?start=124s&end=184",
            "1MOOJuxUu9QiQE9GgkYYPb": "https://www.youtube.com/embed/lYaVNFHcpuQ?start=73s&end=133"
        }
    }
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
    });
}

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
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
        case AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
}

export default reducer;