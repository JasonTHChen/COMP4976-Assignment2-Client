import { IAuthentication } from '../models/user.model'
import { IUser } from '../models/user.model'

export class User implements IUser  {

    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    mobileNumber: string;
    sailingExperience: string;

    constructor() {

    }
}
