import { EARNING } from '../Constants'

export const SetEarnings = (data) => {
    return {
        type: EARNING,
        payload: data,
    }
}
