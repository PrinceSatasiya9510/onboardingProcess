export interface UserInterface {
    id: number,
    name: string,
    email: string,
    phone: number,
    address: string
}

export interface initialStateInterface {
    Users: UserInterface[],
    isLoding: boolean,
    error: boolean
}

export interface defaultStateInterface {
    storeKey: initialStateInterface
}