'use client'

import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import '@/app/style.css'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ui/errorDisplay'
import { CircleAlert } from 'lucide-react'

interface Err {
    username: string[] | null
    email: string[] | null
}

const SignUp = () => {
    const [res, setPost] = useState(true)
    const [usernameErr, setUsernameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const router = useRouter()

    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    // Check for authentication status on page load
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            router.push('/dashboard')
        }
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/register/',
                formData,
                config
            )

            router.push('/sign-in')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                var err = error.response?.data
                setUsernameErr(err.username)
                setEmailErr(err.email)
            } else {
                console.error(error)
            }
        }
    }


    return (
        <div className="w-full flex-col flex place-items-center">
            <div className="w-5/6">
                <div>
                    <h2 className="w-full text-2xl bold md:text-2xl text-neutral-800 mb-2">
                        Регистрация
                        <br />в Таск Мастер!
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-2">
                        <div className="grid w-full items-center gap-1">
                            <Label htmlFor="username">Имя пользователя</Label>
                            <div className="flex flex-row items-center gap-x-1">
                                <Input
                                    required
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Введите имя пользователя"
                                    onChange={handleChange}
                                />

                                {usernameErr ? (
                                    <CircleAlert className="stroke-destructive" />
                                ) : (
                                    <div className="w-6 h-6"></div>
                                )}
                            </div>
                            {usernameErr ? (
                                <ErrorDisplay message={usernameErr} />
                            ) : (
                                <div className="h-3"></div>
                            )}
                        </div>

                        <div className="grid w-full items-center gap-1">
                            <Label htmlFor="email">Эл.почта</Label>
                            <div className="flex flex-row items-center gap-x-1">
                                <Input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Введите адрес эл.почты"
                                    onChange={handleChange}
                                />

                                {emailErr ? (
                                    <CircleAlert className="stroke-destructive" />
                                ) : (
                                    <div className="w-6 h-6"></div>
                                )}
                            </div>
                            {emailErr ? (
                                <ErrorDisplay message={emailErr} />
                            ) : (
                                <div className="h-3"></div>
                            )}
                        </div>

                        <div className="grid w-full items-center gap-1 mr-6">
                            <Label htmlFor="password">Пароль</Label>
                            <div className="flex flex-row items-center gap-x-1">
                                <Input
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Введите пароль"
                                    onChange={handleChange}
                                />
                                <div className="w-6 h-6"></div>
                            </div>
                        </div>

                        <div className="mr-6 mt-3">
                            <Button
                                type="submit"
                                size="lg"
                                className=" w-full mb-4 mt-2"
                            >
                                Зарегистрироваться
                            </Button>
                            <div className="inline-block w-full max-w-sm gap-3   ">
                                <i className=" text-sm text-[#49296C] mr-2">
                                    Уже есть аккаунт?
                                </i>
                                <Link
                                    className="  text-sm italic underline text-neutral-800"
                                    href="/sign-in"
                                >
                                    Войти здесь
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
