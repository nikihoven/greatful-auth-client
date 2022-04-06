import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { getAccessToken, logout, setAccessToken, setUser } from '../store'
import { AuthResponse } from '../types'

interface AxiosRequestConfigExtended extends AxiosRequestConfig {
    sent: boolean
}

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_SERVER_URL
})

instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const accessToken = getAccessToken()
        if (accessToken && config.headers && !config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }

        return config
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    value => value,
    async error => {
        const prevRequest: AxiosRequestConfigExtended = error?.config

        if (!prevRequest.sent) {
            prevRequest.sent = true

            if (error?.response?.status === 403) {
                await axios.get<AuthResponse>('/auth/refresh')
                    .then(data => {
                        const {id, username, accessToken} = data.data
                        setUser({id, username})
                        setAccessToken(accessToken)
                        if (prevRequest.headers) {
                            prevRequest.headers['Authorization'] = `Bearer ${accessToken}`
                        }
                        return axios(prevRequest)
                    })
                    .catch((err: AxiosError) => {
                        if (err.response?.status === 401) {
                            localStorage.clear()
                            logout()
                        }
                    })
            }
        }

        throw error
    }
)

export { instance }