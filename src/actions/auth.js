import * as api from "../api";
import {RESET_AUTH_STATE, SET_AUTH_USER} from "../types";

export const register = registerFormData => api.register({...registerFormData})
export const login = loginData => api.login({...loginData})
export const onAuthStateChanged = onAuthCallback => api.onAuthStateChanged(onAuthCallback)

export const logout = () => dispatch =>
    api.logout().then(_ => dispatch({user: null, type: SET_AUTH_USER}))

export const storeAuthUser = authUser => dispatch => {
    if (authUser) {
        return api
            .getUserProfile(authUser.uid)
            .then(userWithProfile => dispatch({user: userWithProfile, type: SET_AUTH_USER}))
    } else {
        return dispatch({user: null, type: SET_AUTH_USER})
    }
}

export const resetAuthState = () => ({type: RESET_AUTH_STATE})