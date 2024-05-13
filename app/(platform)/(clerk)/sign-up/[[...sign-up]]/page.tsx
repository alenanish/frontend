import { Inter } from "next/font/google";
import { Key } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import "@/app/style.css";


const SignUp = () => {
    return (
        <div>
            <div className="flex-col flex items-center; md: items-start">
                <h2 className="text-2xl bold max-w-sm md:text-2xl text-neutral-800 mb-2">
                    Регистрация
                </h2>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input type="name" id="name" placeholder="Введите имя" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="email">Эл. почта</Label>
                    <Input type="email" id="email" placeholder="Введите адрес эл. почты" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="password">Пароль</Label>
                    <Input type="password" id="password" placeholder="Придумайте пароль" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="password_confirm">Подтверждение пароля</Label>
                    <Input type="password_confirm" id="password_confirm" placeholder="Повторите пароль" />
                </div>
                
                <Button type="submit" size="lg" className="max-w-sm mb-4 w-full">
                    Зарегистрироваться
                </Button>
                <Button variant="outline" size="lg" asChild className="max-w-sm w-full">
                    <Link href="/sign-up">
                    Войти здесь
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default SignUp;