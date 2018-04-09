export interface IUser {
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
}

export class IAuthentication {
    token_type: string;
    access_token: string;
    expires_in: number;
}
