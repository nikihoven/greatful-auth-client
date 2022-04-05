import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { useTypedStoreActions, useTypedStoreState } from './store/hooks'
import { Template } from './components/routing/layout'
import { UsersPage } from './pages/users.page'
import { LoginPage } from './pages/login.page'
import { SignupPage } from './pages/signup.page'
import { useEffect } from 'react'

const App = () => {
    const {accessToken} = useTypedStoreState(state => state.auth)
    const {refresh} = useTypedStoreActions(actions => actions.auth)

    const location = useLocation()

    useEffect(() => {
        if (localStorage.getItem('persistence')) {
            refresh()
        }
    }, [])

    return (
        <Routes>
            <Route element={<Template/>}>
                {
                    accessToken
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