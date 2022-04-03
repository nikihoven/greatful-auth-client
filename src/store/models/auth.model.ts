import { action, Action, thunk, Thunk } from 'easy-peasy'

import { IUser } from '../../types'

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


    signup: thunk((actions, {nickname, password, remember}) => {

    }),
    login: thunk((actions, {nickname, password, remember}) => {

    }),
    refresh: thunk((actions) => {

    }),
    logout: thunk((actions) => {

    })
}