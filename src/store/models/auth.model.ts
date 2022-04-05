import { action, Action, thunk, Thunk } from 'easy-peasy'
import { AxiosError } from 'axios'

import { instance } from '../../http'
import { AuthResponse, IUser } from '../../types'
import { Model } from './index'

interface AuthState {
    user: IUser | null
    accessToken: string | null
}

interface AuthActions {
    setUser: Action<this, IUser | null>
    setAccessToken: Action<this, string | null>
}

interface AuthThunks {
    signup: Thunk<this, {username: string, password: string, remember: boolean}, undefined, Model>
    login: Thunk<this, {username: string, password: string, remember: boolean}, undefined, Model>
    refresh: Thunk<this, undefined, undefined, Model>
    logout: Thunk<this, undefined, undefined, Model>
}

export interface AuthModel extends AuthState, AuthActions, AuthThunks {}

export const initialAuthModel: AuthModel = {
    user: null,
    accessToken: null,


    setUser: action((state, payload) => {
        state.user = payload
    }),
    setAccessToken: action((state, payload) => {
        state.accessToken = payload
    }),


    signup: thunk(async (actions, {username, password, remember}, {getStoreActions}) => {
        await instance.post<AuthResponse>('/auth/signup', {username, password})
            .then(data => data.data)
            .then(data => {
                const {id, username, accessToken} = data
                actions.setUser({
                    id,
                    username
                })
                actions.setAccessToken(accessToken)
                getStoreActions().global.setError(null)
                remember && localStorage.setItem('persistence', JSON.stringify(true))
            })
            .catch((err: AxiosError) => {
                switch (err.response?.status) {
                    case 406:
                        getStoreActions().global.setError('Invalid data')
                        break
                    case 409:
                        getStoreActions().global.setError('User with this username has already existed')
                        break
                    default:
                        getStoreActions().global.setError('Unresolved error, try again later')
                }
            })
    }),
    login: thunk(async (actions, {username, password, remember}, {getStoreActions}) => {
        await instance.post<AuthResponse>('/auth/login', {username, password})
            .then(data => data.data)
            .then(data => {
                const {id, username, accessToken} = data

                actions.setUser({
                    id,
                    username
                })
                actions.setAccessToken(accessToken)
                getStoreActions().global.setError(null)
                remember && localStorage.setItem('persistence', JSON.stringify(true))
            })
            .catch((err: AxiosError) => {
                switch (err.response?.status) {
                    case 400:
                        getStoreActions().global.setError('Incorrect username or password')
                        break
                    default:
                        getStoreActions().global.setError('Unresolved error, try again later')
                }
            })
    }),
    refresh: thunk(async (actions, _, {getStoreActions}) => {
        await instance.get<AuthResponse>('/auth/refresh')
            .then(data => data.data)
            .then(data => {
                const {id, username, accessToken} = data

                actions.setUser({
                    id,
                    username
                })
                actions.setAccessToken(accessToken)
            })
            .catch(() => {
                localStorage.clear()
                actions.setUser(null)
                actions.setAccessToken(null)
                getStoreActions().global.setError(null)
            })
            .finally(() => setTimeout(() => getStoreActions().global.setLoading(false), 500))
    }),
    logout: thunk(async (actions, payload, {getStoreActions}) => {
        await instance.get<AuthResponse>('/auth/logout')
            .then(data => data.data)
            .then(() => {
                actions.setUser(null)
                actions.setAccessToken(null)
                getStoreActions().global.setError(null)
            })
            .catch(() => {
                localStorage.clear()
                actions.setUser(null)
                actions.setAccessToken(null)
                getStoreActions().global.setError(null)
            })
    })
}