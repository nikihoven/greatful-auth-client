import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'

import { store } from './store'
import { App } from './App'

import 'antd/dist/antd.min.css'
import './index.css'

const root = createRoot(document.getElementById('root') as Element)

root.render(
    <BrowserRouter>
        <StoreProvider store={store}>
            <App/>
        </StoreProvider>
    </BrowserRouter>
)