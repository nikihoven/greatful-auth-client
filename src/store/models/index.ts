import { AuthModel, initialAuthModel } from './auth.model'

export interface Model {
    auth: AuthModel
}

const model: Model = {
    auth: initialAuthModel
}

export { model }