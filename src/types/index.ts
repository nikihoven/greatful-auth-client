export interface IUser {
    id: string
    nickname: string
}

export type AuthResponse = {
    id: string
    nickname: string
    accessToken: string
}