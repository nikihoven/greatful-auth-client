import { AuthModel, initialAuthModel } from './auth.model'
import { GlobalModel, initialGlobalModel } from './global.model'

export interface Model {
    auth: AuthModel
    global: GlobalModel
}

const model: Model = {
    auth: initialAuthModel,
    global: initialGlobalModel
}

export { model }