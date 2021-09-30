import {
    PASS,
    INITIAL
} from "../Types"

export const pass = data => {
    return {
        type: PASS,
        payload: data
    }
}

export const initial = () => {
    return {
        type: INITIAL,
        payload: null
    }
}
