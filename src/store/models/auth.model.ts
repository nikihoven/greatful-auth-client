import { action, Action, thunk, Thunk } from 'easy-peasy'

import { IUser } from '../../types'
import { instance } from '../../http'

interface AuthState {
    user: IUser | null
    accessToken: string | null
}

interface AuthActions {
    setUser: Action<this, IUser | null>
    setAccessToken: Action<this, string | null>
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


    setUser: action((state, payload) => {
        state.user = payload
    }),
    setAccessToken: action((state, payload) => {
        state.accessToken = payload
    }),


    signup: thunk(async (actions, {nickname, password, remember}) => {
        const data = await instance.post('/auth/signup', {nickname, password})
        console.log(data)
    }),
    login: thunk(async (actions, {nickname, password, remember}) => {
        const data = await instance.post('/auth/login', {nickname, password})
        console.log(data)
    }),
    refresh: thunk(async (actions) => {
        const data = await instance.get('/auth/refresh')
        console.log(data)
    }),
    logout: thunk(async (actions) => {
        const data = await instance.get('/auth/logout')
        console.log(data)
    })
}