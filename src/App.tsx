import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { useTypedStoreState } from './store/hooks'
import { Layout } from './components/routing/layout'
import { UsersPage } from './pages/users.page'
import { LoginPage } from './pages/login.page'
import { SignupPage } from './pages/signup.page'

const App = () => {
    const {accessToken} = useTypedStoreState(state => state.auth)

    const location = useLocation()

    return (
        <Routes>
            <Route element={<Layout/>}>
                {accessToken
                    ?
                    <>
                        <Route path="/" element={<UsersPage/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </>
                    :
                    <>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="*" element={<Navigate to="/login" state={{from: location}} replace/>}/>
                    </>
                }
            </Route>
        </Routes>
    )
}

export { App }