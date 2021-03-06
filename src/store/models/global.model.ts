import { action, Action } from 'easy-peasy'

interface GlobalState {
    error: string | null
    globalLoading: boolean
}

interface GlobalActions {
    setLoading: Action<this, boolean>
    setError: Action<this, string | null>
}

export interface GlobalModel extends GlobalState, GlobalActions {}

export const initialGlobalModel: GlobalModel = {
    error: null,
    globalLoading: true,

    setError: action((state, payload) => {
        state.error = payload
    }),
    setLoading: action((state, payload) => {
        state.globalLoading = payload
    })
}