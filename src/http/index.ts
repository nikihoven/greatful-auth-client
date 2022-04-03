import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { getAccessToken, setAccessToken, setUser, logout } from '../store'
import { ResponseAuthDto } from './dto'

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
                await axios.get<ResponseAuthDto>('/auth/refresh')
                    .then(data => {
                        const {id, nickname, accessToken} = data.data
                        setUser({id, nickname})
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

                // try {
                //     const data = await axios.get<ResponseAuthDto>('/auth/refresh')
                //     const {id, nickname, accessToken} = data.data
                //
                //     setAccessToken(accessToken)
                //     setUser({id, nickname})
                //     if (prevRequest.headers) {
                //         prevRequest.headers['Authorization'] = `Bearer ${accessToken}`
                //     }
                // } catch (e: AxiosError) {
                //     if (e.response?.status === 401) {
                //         localStorage.clear()
                //         logout()
                //     }
                // }
            }
        }
    }
)

export { instance }