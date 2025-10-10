export interface UserInterface {
    id: string | number,
    name: string,
    email: string,
    phone: number | null,
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