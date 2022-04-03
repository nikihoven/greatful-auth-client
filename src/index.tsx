import { createRoot } from 'react-dom/client'
import { StoreProvider } from 'easy-peasy'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { store } from './store'

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