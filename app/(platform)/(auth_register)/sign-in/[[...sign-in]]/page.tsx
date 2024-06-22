'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import '@/app/style.css'
import { redirect, useRouter } from 'next/navigation'
import { CircleAlert } from 'lucide-react'
import ErrorDisplay from '@/components/ui/errorDisplay'

const SignIn = () => {
    const [res, setPost] = useState(true)
    const router = useRouter()
    const [userErr, setUserErr] = useState('')
    const [passErr, setPassErr] = useState()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login/',
                formData,
                config
            )
            setPost(response.data)
            localStorage.setItem('auth', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            router.push('/dashboard') // Redirect to Dashboard after successful login
        } catch (error) {
            if (axios.isAxiosError(error)) {
                var err = error.response?.data.detail
                setUserErr(err)
                setPassErr(err)
                
            } else {
                console.error(error)
            }
        }
    }

    // Check for authentication status on page load
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            router.push('/dashboard') // Redirect to Dashboard if user is authenticated
        }
    }, [])

    return (
        <div className="w-full flex-col flex place-items-center">
            <div className="w-5/6">
                <div>
                    <h2 className="w-full text-2xl bold md:text-2xl text-neutral-800 mb-2">
                        Добро пожаловать
                        <br />в Таск Мастер!
                    </h2>
                    <p className="text-md w-full md:text-md text-neutral-800 mb-4">
                        Пожалуйста, войдите в систему,
                        <br />
                        чтобы получить доступ к учетной записи.
                    </p>
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

                                {userErr ? (
                                    <CircleAlert className="stroke-destructive" />
                                ) : (
                                    <div className="w-6 h-6"></div>
                                )}
                            </div>
                            {userErr ? (
                                <ErrorDisplay message={userErr} />
                            ) : (
                                <div className="h-3"></div>
                            )}
                        </div>

                        <div className="grid w-full items-center gap-1">
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

                                {passErr ? (
                                    <CircleAlert className="stroke-destructive" />
                                ) : (
                                    <div className="w-6 h-6"></div>
                                )}
                            </div>
                            {passErr ? (
                                <ErrorDisplay message={passErr} />
                            ) : (
                                <div className="h-3"></div>
                            )}
                        </div>
                    </div>
                    <div className="mr-6">
                        <Button
                            type="submit"
                            size="lg"
                            className=" w-full mb-4 mt-2"
                        >
                            Войти
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            asChild
                            className="w-full"
                        >
                            <Link href="/sign-up">Зарегистрироваться</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
