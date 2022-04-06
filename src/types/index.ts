export interface IUser {
    id: string
    username: string
}

export interface ICustomer {
    id: string
    username: string
    createdAt: Date
}

export type AuthResponse = {
    id: string
    username: string
    accessToken: string
}

export type CustomersResponse = {
    customers: ICustomer[]
}