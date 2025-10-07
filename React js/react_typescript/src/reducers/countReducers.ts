
export const initialState = 0;
export const reducer = (state: number, action: number): number => {
    switch (action) {
        case 1:
            return state + 1;
        case 10:
            return state + 10;
        case 100:
            return state + 100;
        default:
            return state
    }
}