
import {
    FETCH_SERVICES_SUCCESS,
    FETCH_SERVICE_SUCCESS,
    REQUEST_SERVICE,
    SET_AUTH_USER,
    RESET_AUTH_STATE,
    FETCH_USER_SERVICES_SUCCESS} from 'types'

import * as api from 'api'

export const fetchServices = () => dispatch =>
    api
        .fetchServices()
        .then(services => dispatch(
            {
                type: FETCH_SERVICES_SUCCESS,
                services
            }
            )
        )

export const fetchUserServices = (userId) => dispatch =>
    api
        .fetchUserServices(userId)
        .then(services => dispatch({type: FETCH_USER_SERVICES_SUCCESS, services}))


export const fetchServiceById = serviceId => (dispatch, getState) => {
    const lastService = getState().selectedService.item
    if (lastService.id && lastService.id === serviceId) { return Promise.resolve() }

    dispatch({type: REQUEST_SERVICE})
    return api
        .fetchServiceById(serviceId)
        .then(service => dispatch(
            {
                type: FETCH_SERVICE_SUCCESS,
                service
            }
            )
        )
}

export const createService = (newService, userId) => {
    newService.price = parseInt(newService.price, 10)
    newService.user = userId

    return api
        .createService(newService)
}

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