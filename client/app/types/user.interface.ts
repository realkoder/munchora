export interface ICreateUser {
    fullname: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface IUser {
    id: string;
    fullname: string,
    email: string,
    provider?: string,
    uid?: string,
    image_src: string,
    created_at: Date,
    updated_at: Date;
}

export interface ILoginResponse {
    user: IUser;
}