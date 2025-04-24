"use client";
import { InputField } from "@/components/forms/input-field";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useCallback, useEffect } from "react";
import { RegisterFormData } from "@/types/register";
import Button from "@/components/button";
import Link from "next/link";
import Alert from "@/components/alert";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaReady, setCaptchaReady] = useState(false);


    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        // Always update the state, even if it's an auto-filled password field or an empty string
        const newValue =
            type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));

        // Clear the corresponding error when the user starts typing
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleCaptchaVerify = useCallback((token: string) => {
        setCaptchaToken(token);
    }, []);

    // Initialize reCAPTCHA
    useEffect(() => {
        setCaptchaReady(true);
    }, []);

    const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate CAPTCHA first
        if (!captchaToken) {
            setError('Please complete the CAPTCHA verification');
            return;
        }

        // Validate the form
        const errors: any = {};
        Object.keys(formData).forEach((fieldName) => {
            const value = formData[fieldName];

            // Check if the field is a string and empty
            if (typeof value === "string" && value.trim() === "") {
                errors[fieldName] = "This field is required";
            }
        });

        // Check if there are any errors
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        // Validate email format when the email field changes
        if (formData.email && formData.email.trim() !== "" && !isValidEmail(formData.email)) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: "Please enter a valid email address",
            }))
            return;
        }

        // Check if password and confirmPassword match
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: "Passwords do not match",
            }))
            return;
        }
        setError('')
        setIsLoading(true)
        // First, create the user in your database
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    captchaToken
                }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Signup failed. Please try again.')
            }

            // If successful, redirect to verification page
            router.push('/login')
            //router.push('/email-verification')
        } catch (err: any) {
            setError(err.message)
            setCaptchaToken(''); // Reset CAPTCHA on erro
        } finally {
            setIsLoading(false)
        }

    };
    return (
        <>
            <div className="md:mx-auto md:w-full md:max-w-md">
                <h2 className="text-center text-2xl leading-9 tracking-tight text-indigo-700 sm:text-3xl">
                    Create new account
                </h2>
            </div>
            <div className="mt-4 md:mx-auto md:w-full md:max-w-md">
                <GoogleReCaptchaProvider
                    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    scriptProps={{
                        async: true,
                        defer: true,
                        appendTo: 'body',
                        nonce: undefined,
                    }}
                >
                    <form action="#" method="POST" className="space-y-4 md:space-y-4" onSubmit={registerHandler}>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="mt-2">
                                <InputField
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={handleInputChange}
                                    value={formData.firstName}
                                />
                                {formErrors.firstName && (
                                    <span className="text-red-500 text-sm">{formErrors.firstName}</span>
                                )}
                            </div>
                            <div className="mt-2">
                                <InputField
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                    value={formData.lastName}
                                />
                                {formErrors.lastName && (
                                    <span className="text-red-500 text-sm">{formErrors.lastName}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <InputField
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    onChange={handleInputChange}
                                    value={formData.phone}
                                />
                                {formErrors.phone && (
                                    <span className="text-red-500 text-sm">{formErrors.phone}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <InputField
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                />
                                {formErrors.email && (
                                    <span className="text-red-500 text-sm">{formErrors.email}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="Create Password"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                />
                                {formErrors.password && (
                                    <span className="text-red-500 text-sm">
                                        {formErrors.password}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <InputField
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={handleInputChange}
                                    value={formData.confirmPassword}
                                />
                                {formErrors.confirmPassword && (
                                    <span className="text-red-500 text-sm">
                                        {formErrors.confirmPassword}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Hidden reCAPTCHA - will automatically verify */}
                        {captchaReady && (
                            <GoogleReCaptcha
                                onVerify={handleCaptchaVerify}
                                refreshReCaptcha={!captchaToken}
                            />
                        )}
                        <div>
                            <Button
                                text={isLoading ? "Processing..." : "Sign Up"}
                                type="submit"
                                disabled={isLoading}
                                className={`rounded-3xl py-3 w-full border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700 ${
                                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                            />
                        </div>
                    </form>
                </GoogleReCaptchaProvider>
                <div className="mt-4">
                    <Button
                        icon="Google"
                        text="Continue With Google"
                        className="rounded-3xl py-3 w-full border-indigo-700 text-indigo-700 hover:bg-indigo-500 hover:text-white"
                    />
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have a account?{' '}
                    <Link href={'/login'}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign In
                    </Link>
                </p>
            </div>
            {error &&
                <Alert name="danger" title={error} onClose={() => setError('')} />
            }

        </>
    )
}