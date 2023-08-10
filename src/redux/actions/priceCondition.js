import { CURRENTPRICE } from '../Constants'

export const SetPrice = (data) => {
    return {
        type: CURRENTPRICE,
        payload: data,
    }
}
