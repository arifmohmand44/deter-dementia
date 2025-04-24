export type RegisterFormData = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    [key: string]: string | boolean;
};