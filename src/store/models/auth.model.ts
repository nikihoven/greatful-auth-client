import { action, Action, thunk, Thunk } from 'easy-peasy'

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
            .then(data => data.data)
            .then(data => {
                const {id, nickname, accessToken} = data

                actions.setUser({
                    id,
                    nickname
                })
                actions.setAccessToken(accessToken)
                actions.setError(null)
            })
    }),
    login: thunk(async (actions, {nickname, password, remember}) => {
        await instance.post('/auth/login', {nickname, password})
            .then(data => data.data)
            .then(data => {
                const {id, nickname, accessToken} = data

                actions.setUser({
                    id,
                    nickname
                })
                actions.setAccessToken(accessToken)
                actions.setError(null)
            })
    }),
    refresh: thunk(async actions => {
        await instance.get('/auth/refresh')
            .then(data => console.log(data.data))
    }),
    logout: thunk(async actions => {
        await instance.get('/auth/logout')
            .then(data => data.data)
            .then(() => {
                actions.setUser(null)
                actions.setAccessToken(null)
                actions.setError(null)
            })
    })
}