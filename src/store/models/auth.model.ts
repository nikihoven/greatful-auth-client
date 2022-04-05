import { action, Action, thunk, Thunk } from 'easy-peasy'
import { AxiosError } from 'axios'

import { instance } from '../../http'
import { AuthResponse, IUser } from '../../types'

interface AuthState {
    user: IUser | null
    accessToken: string | null
    error: string | null
}

interface AuthActions {
    setUser: Action<this, IUser | null>
    setAccessToken: Action<this, string | null>
    setError: Action<this, string | null>
}

interface AuthThunks {
    signup: Thunk<this, {username: string, password: string, remember: boolean}>
    login: Thunk<this, {username: string, password: string, remember: boolean}>
    refresh: Thunk<this>
    logout: Thunk<this>
}

export interface AuthModel extends AuthState, AuthActions, AuthThunks {}

export const initialAuthModel: AuthModel = {
    user: null,
    accessToken: null,
    error: null,


    setUser: action((state, payload) => {
        state.user = payload
    }),
    setAccessToken: action((state, payload) => {
        state.accessToken = payload
    }),
    setError: action((state, payload) => {
        state.error = payload
    }),


    signup: thunk(async (actions, {username, password, remember}) => {
        await instance.post<AuthResponse>('/auth/signup', {username, password})
            .then(data => data.data)
            .then(data => {
                const {id, username, accessToken} = data

                actions.setUser({
                    id,
                    username
                })
                actions.setAccessToken(accessToken)
                actions.setError(null)
            })
            .catch((err: AxiosError) => {
                switch (err.response?.status) {
                    case 406:
                        actions.setError('Invalid data')
                        break
                    case 409:
                        actions.setError('User with this username has already existed')
                        break
                    default:
                        actions.setError('Unresolved error, try again later')
                }
            })
    }),
    login: thunk(async (actions, {username, password, remember}) => {
        await instance.post<AuthResponse>('/auth/login', {username, password})
            .then(data => data.data)
            .then(data => {
                const {id, username, accessToken} = data

                actions.setUser({
                    id,
                    username
                })
                actions.setAccessToken(accessToken)
                actions.setError(null)
            })
            .catch((err: AxiosError) => {
                switch (err.response?.status) {
                    case 400:
                        actions.setError('Incorrect username or password')
                        break
                    default:
                        actions.setError('Unresolved error, try again later')
                }
            })
    }),
    refresh: thunk(async actions => {
        await instance.get<AuthResponse>('/auth/refresh')
            .then(data => data.data)
            .catch(() => {
                localStorage.clear()
                actions.setUser(null)
                actions.setAccessToken(null)
                actions.setError(null)
            })
    }),
    logout: thunk(async actions => {
        await instance.get<AuthResponse>('/auth/logout')
            .then(data => data.data)
            .then(() => {
                actions.setUser(null)
                actions.setAccessToken(null)
                actions.setError(null)
            })
            .catch(() => {
                localStorage.clear()
                actions.setUser(null)
                actions.setAccessToken(null)
                actions.setError(null)
            })
    })
}