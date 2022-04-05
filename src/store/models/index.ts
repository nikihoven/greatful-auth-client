import { AuthModel, initialAuthModel } from './auth.model'
import { GlobalModel, initialGlobalModel } from './global.model'
import { CustomersModel, initialCustomersModel } from './customers.model'

export interface Model {
    auth: AuthModel
    global: GlobalModel
    customers: CustomersModel
}

const model: Model = {
    auth: initialAuthModel,
    global: initialGlobalModel,
    customers: initialCustomersModel
}

export { model }