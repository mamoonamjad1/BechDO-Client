import { USERDATA } from '../Constants'

export const SetUser = (data) => {
    return {
        type: USERDATA,
        payload: data,
    }
}
