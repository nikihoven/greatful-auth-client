import { createRoot } from 'react-dom/client'
import { StoreProvider } from 'easy-peasy'

import { App } from './App'
import { store } from './store'

import './index.css'

const container = document.getElementById('root')
if (!container) {
    throw new Error('Failed to find the root element')
}

const root = createRoot(container)

root.render(
    <StoreProvider store={store}>
        <App/>
    </StoreProvider>
)