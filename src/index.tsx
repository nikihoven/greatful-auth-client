import { createRoot } from 'react-dom/client'
import { StoreProvider } from 'easy-peasy'

import { App } from './App'
import { store } from './store'

import './index.css'

const container = document.getElementById('root')

const root = createRoot(container as Element)

root.render(
    <StoreProvider store={store}>
        <App/>
    </StoreProvider>
)