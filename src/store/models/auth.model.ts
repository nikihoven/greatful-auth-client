import { action, Action, thunk, Thunk } from 'easy-peasy'
import { AxiosError } from 'axios'

import { AuthResponse, IUser } from '../../types'
import { instance } from '../../http'

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
    signup: Thunk<this, {nickname: string, password: string, remember: boolean}>
    login: Thunk<this, {nickname: string, password: string, remember: boolean}>
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


    signup: thunk(async (actions, {nickname, password, remember}) => {
        await instance.post<AuthResponse>('/auth/signup', {nickname, password})
            .then(data => {
                if (data instanceof Error) throw data

                return data.data
            })
            .then(data => {
                const {id, nickname, accessToken} = data

                actions.setUser({
                    id,
                    nickname
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
                        actions.setError('User with this nickname has already existed')
                        break
                    default:
                        actions.setError('Unresolved error, try again later')
                }
            })
    }),
    login: thunk(async (actions, {nickname, password, remember}) => {
        await instance.post<AuthResponse>('/auth/login', {nickname, password})
            .then(data => {
                if (data instanceof Error) throw data

                return data.data
            })
            .then(data => {
                const {id, nickname, accessToken} = data

                actions.setUser({
                    id,
                    nickname
                })
                actions.setAccessToken(accessToken)
                actions.setError(null)
            })
            .catch((err: AxiosError) => {
                switch (err.response?.status) {
                    case 406:
                        actions.setError('Incorrect nickname or password')
                        break
                    default:
                        actions.setError('Unresolved error, try again later')
                }
            })
    }),
    refresh: thunk(async actions => {
        await instance.get<AuthResponse>('/auth/refresh')
            .then(data => {
                if (data instanceof Error) throw data
            })
            .catch(() => {
                localStorage.clear()
                actions.setUser(null)
                actions.setAccessToken(null)
                actions.setError(null)
            })
    }),
    logout: thunk(async actions => {
        await instance.get<AuthResponse>('/auth/logout')
            .then(data => {
                if (data instanceof Error) throw data
            })
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