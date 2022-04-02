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
    signup: Thunk<this, {id: string, nickname: string, remember: boolean}>
    login: Thunk<this, {id: string, nickname: string, remember: boolean}>
    refresh: Thunk<this>
    logout: Thunk<this>
}

export interface AuthModel extends AuthState, AuthActions, AuthThunks {}

export const initialAuthModel: AuthModel = {
    /*----    State    ----*/
    user: null,
    accessToken: null,


    /*----    Actions    ----*/
    setUser: action((state, payload) => {
        state.user = payload
    }),
    setAccessToken: action((state, payload) => {
        state.accessToken = payload
    }),


    /*----    Thunks    ----*/
    signup: thunk((actions, {id, nickname, remember}) => {

    }),
    login: thunk((actions, {id, nickname, remember}) => {

    }),
    refresh: thunk((actions) => {

    }),
    logout: thunk((actions) => {

    })
}