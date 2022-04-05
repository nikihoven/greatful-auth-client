export interface IUser {
    id: string
    username: string
}

export type AuthResponse = {
    id: string
    username: string
    accessToken: string
}