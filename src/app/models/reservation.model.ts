import { Boat } from './boat'
import { IUser } from './user.model'

export interface IReservation {
    boat: Boat;
    user: IUser;
    startDateTime: string;
    endDateTime: string;
    boatName: string;
    userName: string;
    reservationId: number
}
