"use client";

import React, { useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import "@/app/style.css";
import { redirect, useRouter } from 'next/navigation';


const SignIn = () => {
    const [res, setPost] = useState(true);
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });

     let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          }
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value,
        }));

    };




    const handleSubmit = async (e : any) => {
        e.preventDefault();

        try {

          const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
          setPost(response.data);

          console.log('Login successful:', response.data);
          localStorage.setItem('auth', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          router.push('/dashboard');
        } catch (error) {
          console.error('Login failed:', error);


        }
      };



    return (
        <div className="w-full flex-col flex place-items-center">
            <h2 className="text-2xl bold md:text-2xl text-neutral-800 mb-2">
                Добро пожаловать в Таск Мастер!
            </h2>
            <p className="text-md max-w-sm md:text-md text-neutral-800 mb-4">
                Пожалуйста, войдите в систему, чтобы получить доступ к учетной записи.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input required type="text" name="username" id="username" placeholder="Введите имя пользователя" onChange={handleChange} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="password">Пароль</Label>
                    <Input required type="password" name="password" id="password" placeholder="Введите имя пользователя" onChange={handleChange}  />
                </div>

                <Button type="submit" size="lg" className="max-w-sm mb-4 w-full">
                    Войти
                </Button>
                <Button variant="outline" size="lg" asChild className="max-w-sm w-full">
                    <Link href="/sign-up">
                    Зарегистрироваться
                    </Link>
                </Button>
            </form>
        </div>
    );
};

export default SignIn;
