export type LoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
    [key: string]: string | boolean;
};