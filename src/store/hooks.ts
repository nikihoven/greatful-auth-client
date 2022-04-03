import { createTypedHooks } from 'easy-peasy'

import { Model } from './models'

const {
    useStoreActions: useTypedStoreActions,
    useStoreState: useTypedStoreState,
    useStoreDispatch: useTypedStoreDispatch,
    useStore: useTypedStore
} = createTypedHooks<Model>()

export {
    useTypedStoreActions,
    useTypedStoreState,
    useTypedStoreDispatch,
    useTypedStore
}