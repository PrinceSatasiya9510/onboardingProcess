export interface DataInteface {
    id: number | null | undefined,
    name: string,
    email: string,
    phone: number,
    password: string
}


export interface StoreKey {
    storeKey: UserInterface
}

export interface UserInterface {
    users: DataInteface[]
}