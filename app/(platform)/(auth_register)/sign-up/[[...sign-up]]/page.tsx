
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import "@/app/style.css";


const SignUp = () => {
    return (
        <div className="w-full flex-col flex place-items-center">
            <h2 className="text-2xl bold md:text-2xl text-neutral-800 mb-4">
                Регистрация
            </h2>
            
            <div className="grid w-full max-w-sm gap-1.5 mb-2">
                <Label htmlFor="name">Имя</Label>
                <Input type="name" id="name" placeholder="Введите имя" />
            </div>
            <div className="grid w-full max-w-sm gap-1.5 mb-4">
                <Label htmlFor="email">Эл. почта</Label>
                <Input type="email" id="email" placeholder="Введите адрес эл. почты " />
            </div>
            <div className="grid w-full max-w-sm gap-1.5 mb-4">
                <Label htmlFor="password">Пароль</Label>
                <Input type="password" id="password" placeholder="Придумайте пароль" />
            </div>
            <div className="grid w-full max-w-sm gap-1.5 mb-4">
                <Label htmlFor="confirm_password">Подтверждение пароля</Label>
                <Input type="password" id="confirm_password" placeholder="Повторите пароль" />
            </div>    
            <Button type="submit" size="lg" className="max-w-sm mb-4 w-full">
                Зарегистрироваться
            </Button>
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
