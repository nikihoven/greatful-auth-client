import { action, Action, thunk, Thunk } from 'easy-peasy'

import { instance } from '../../http'
import { Model } from './index'
import { CustomersResponse, ICustomer } from '../../types'

interface CustomersState {
    customers: ICustomer[] | null
    loading: boolean
}

interface CustomersActions {
    setCustomers: Action<this, ICustomer[] | null>
    setLoading: Action<this, boolean>
}

interface CustomersThunks {
    getCustomers: Thunk<this, undefined, undefined, Model>
}

export interface CustomersModel extends CustomersState, CustomersActions, CustomersThunks {}

export const initialCustomersModel: CustomersModel = {
    customers: null,
    loading: false,

    setCustomers: action((state, payload) => {
        state.customers = payload
    }),
    setLoading: action((state, payload) => {
        state.loading = payload
    }),


    getCustomers: thunk(async (actions, payload, {getStoreActions, getStoreState}) => {
        actions.setLoading(true)
        getStoreActions().global.setError(null)
        await instance.get<CustomersResponse>('/customers')
            .then(data => data.data)
            .then(data => {
                if (data) {
                    actions.setCustomers(data.customers)
                }
            })
            .catch(() => {
                getStoreActions().global.setError('Unresolved error, try again later')
            })
            .finally(() => actions.setLoading(false))
    })
}