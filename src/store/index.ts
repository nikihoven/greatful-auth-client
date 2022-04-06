import { createStore } from 'easy-peasy'

import { model } from './models'
import { IUser } from '../types'

const store = createStore(model)

const getAccessToken = () => store.getState().auth.accessToken
const setAccessToken = (token: string) => store.dispatch.auth.setAccessToken(token)
const setUser = (user: IUser) => store.dispatch.auth.setUser(user)
const logout = () => store.dispatch.auth.logout()

export { store, getAccessToken, setAccessToken, setUser, logout }