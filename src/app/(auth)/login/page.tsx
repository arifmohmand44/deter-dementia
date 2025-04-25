"use client"

import { InputField } from "@/components/forms/input-field"
import { Label } from "@/components/forms/label"
import { type ChangeEvent, type FormEvent, useState, useEffect } from "react"
import type { LoginFormData } from "@/types/login"
import Button from "@/components/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Alert from "@/components/alert";

export default function Login() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        rememberMe: false,
    })

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
        rememberMe: "",
    })

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target

        // Always update the state, even if it's an auto-filled password field or an empty string
        const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }))

        // Clear the corresponding error when the user starts typing
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }))

        // Clear any previous error messages
        setError(null)
    }

    const validateForm = (): boolean => {
        const errors: any = {}
        let isValid = true

        // Check required fields
        if (!formData.email.trim()) {
            errors.email = "Email is required"
            isValid = false
        } else if (!isValidEmail(formData.email)) {
            errors.email = "Please enter a valid email address"
            isValid = false
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required"
            isValid = false
        }

        setFormErrors(errors)
        return isValid
    }

    const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        if (!validateForm()) {
            return
        }

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            console.log(result);

            if (result?.error) {
                setError("Invalid email or password")
                setIsLoading(false)
                return
            }

            const sessionResponse = await fetch('/api/auth/session');
            const sessionData = await sessionResponse.json();
            router.push(sessionData?.user.firstLogin ? "/d-summary" : "/disclaimer")
            router.refresh()
        } catch (error) {
            setError("Something went wrong. Please try again.")
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        setIsLoading(true)
        // signIn("google", { callbackUrl: "/disclaimer" })
    }

    return (
        <>
            <div className="md:mx-auto md:w-full md:max-w-md">
                <h2 className="mt-4 text-center text-2xl leading-9 tracking-tight text-indigo-700 sm:text-3xl">Sign In</h2>
            </div>
            <div className="md:mt-10 md:mx-auto md:w-full md:max-w-md">
                {error &&
                    <Alert name="danger" title={error} onClose={() => setError('')} />
                }
                <form action="#" method="POST" className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
                    <div>
                        <div className="mt-2">
                            <Label title="Email" />
                            <InputField
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                onChange={handleInputChange}
                                value={formData.email}
                            />
                            {formErrors.email && <span className="text-red-500 text-sm">{formErrors.email}</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <Label title="Password" />
                            <div className="text-sm">
                                <Link href={"/forgot-password"} className="font-semibold text-indigo-500 hover:text-indigo-600">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <InputField
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleInputChange}
                                value={formData.password}
                            />
                            {formErrors.password && <span className="text-red-500 text-sm">{formErrors.password}</span>}
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            text={isLoading ? "Signing in..." : "Sign in"}
                            disabled={isLoading}
                            className="rounded-3xl py-3 w-full border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
                        />
                    </div>
                </form>
                <div className="mt-4">
                    <Button
                        icon="Google"
                        text="Continue With Google"
                        disabled={isLoading}
                        className="rounded-3xl py-3 w-full border-indigo-700 text-indigo-700 hover:bg-indigo-500 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={handleGoogleLogin}
                    />
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don&apos;t have a account?{" "}
                    <Link href={"/register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign Up
                    </Link>
                </p>
            </div>
        </>
    )
}
