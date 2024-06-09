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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const router = useRouter();

    const handleLogin = () => {
        /* 
        axios.post('http://localhost:8000/login/', {
            username: username,
            password: password
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        */

        if (true) {
            console.log('OK')
            router.push('/dashboard')
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
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="username">Логин</Label>
                <Input required type="text" id="username" placeholder="Логин" onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label htmlFor="password">Пароль</Label>
                <Input required type="password" id="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)}  />
            </div>  
                
            <Button type="submit" size="lg" className="max-w-sm mb-4 w-full" onClick={handleLogin}>
                Войти
            </Button>
            <Button variant="outline" size="lg" asChild className="max-w-sm w-full">
                <Link href="/sign-up">
                Зарегистрироваться
                </Link>
            </Button>
        </div>
    );
};

export default SignIn;
