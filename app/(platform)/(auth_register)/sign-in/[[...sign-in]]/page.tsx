
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import "@/app/style.css";


const SignIn = () => {
    return (
        <div className="w-full flex-col flex place-items-center">
            <h2 className="text-2xl bold md:text-2xl text-neutral-800 mb-2">
                Добро пожаловать в Таск Мастер!
            </h2>
            <p className="text-md max-w-sm md:text-md text-neutral-800 mb-4">
                Пожалуйста, войдите в систему, чтобы получить доступ к учетной записи.
            </p>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="login">Логин</Label>
                <Input type="login" id="login" placeholder="Логин" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label htmlFor="password">Пароль</Label>
                <Input type="password" id="password" placeholder="Пароль" />
            </div>
                
            <Button type="submit" size="lg" className="max-w-sm mb-4 w-full">
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
