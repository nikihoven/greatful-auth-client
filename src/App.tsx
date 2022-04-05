import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { useTypedStoreActions, useTypedStoreState } from './store/hooks'
import { Template } from './components/routing/layout'
import { Loader } from './components/routing/loader'
import { UsersPage } from './pages/users.page'
import { LoginPage } from './pages/login.page'
import { SignupPage } from './pages/signup.page'

const App = () => {
    const {accessToken} = useTypedStoreState(state => state.auth)
    const {globalLoading} = useTypedStoreState(state => state.global)
    const {refresh} = useTypedStoreActions(actions => actions.auth)
    const {setLoading} = useTypedStoreActions(actions => actions.global)

    const location = useLocation()

    useEffect(() => {
        if (localStorage.getItem('persistence')) {
            refresh()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <Routes>
            <Route element={<Template/>}>
                {
                    !globalLoading
                        ?
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
                        :
                        <Route path="*" element={<Loader/>}/>
                }
            </Route>
        </Routes>
    )
}

export { App }