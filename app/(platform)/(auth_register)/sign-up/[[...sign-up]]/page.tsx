"use client";

import React, { useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import "@/app/style.css";
import { useRouter } from 'next/navigation';


const SignUp = () => {
    const [res, setPost] = useState(true);
    const router = useRouter();


    let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          }
    }

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',

    });

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

          const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
          setPost(response.data);

          console.log('Registration successful:', response.data);
          router.push('/sign-in');
        } catch (error) {
          console.error('Registration failed:', error); 
        }
      };

    return (
        <div className="w-full flex-col flex place-items-center">
            <h2 className="text-2xl bold md:text-2xl text-neutral-800 mb-4">
                Регистрация
            </h2>
            
            <form className="w-full flex-col flex place-items-center" onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm gap-1.5 mb-2">
                    <Label htmlFor="username">Имя</Label>
                    <Input name='username' required type="text" id="username" placeholder="Введите имя" onChange={handleChange} />
                </div>

                <div className="grid w-full max-w-sm gap-1.5 mb-4">
                    <Label htmlFor="email">Эл. почта</Label>
                    <Input name="email" required type="email" id="email" placeholder="Введите адрес эл. почты" onChange={handleChange} />
                </div>
                <div className="grid w-full max-w-sm gap-1.5 mb-4">
                    <Label htmlFor="password">Пароль</Label>
                    <Input required minLength={6} name="password" type="password" id="password" placeholder="Придумайте пароль" onChange={handleChange} />
                </div>
                  
                <Button type="submit" size="lg" className="max-w-sm mb-4 w-full">
                    Зарегистрироваться
                </Button>
            </form>
            <div className="inline-block w-full max-w-sm gap-3   ">
                <i className=" text-sm text-[#49296C] mr-2">Уже есть аккаунт?</i>
                <Link className="  text-sm italic underline text-neutral-800" href="/sign-in">
                    Войти здесь
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
