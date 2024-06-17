"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useEffect, useState } from "react";

const SettingsPage = (userId: number) => {
    const [dataDisabled, setDataDisabled] = useState(true);
    const [user, setUser] = useState('');
    const [poat, setPost] = useState('');


    

    const apiURL = `http://localhost:8000/api/settings/` + localStorage.getItem('auth');
    
        const fetchData = async () => {
            try {
              const response = await axios.get(apiURL, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                }
              })
              console.log(userId)
              setUser(response.data);
              console.log(response.data)
            } catch (error) {
              console.error('Ошибка при получении данных:', error);
            }
          };
    
        useEffect(() => {
            fetchData();
        }, []);
    
    


    return (
   
    
    <div className=" flex flex-col gap-2 items-start m-2 p-4 h-full w-2/3 " >

        {/*<div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between  ">
            <h1 className="block text-3xl font-medium text-neutral-800">
                Настройки 
            </h1>
        </div>
        <div className="bg-white flex flex-wrap gap-4 border-2 border-primary items-stretch p-3
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md h-ful w-full">
            <div className="w-full">
                <h1 className="block text-xl font-medium text-neutral-800 border-b border-neutral-700 mb-3 p-2">Персональная информация</h1>
            <form className="w-full flex-col flex" onSubmit={handleSubmit}>

                <div className="flex flex-row gap-4">
                    <div className="grid w-full  gap-1.5 mb-2">
                        <Label htmlFor="username">Имя</Label>
                        <Input name='username' disabled={dataDisabled} defaultValue={user.username}  required type="text" id="username" placeholder="Введите имя пользователя" onChange={handleChange} />
                    </div>
                    
                </div>
                <div className="grid w-1/2 max-w-sm gap-1.5 mb-4">
                    <Label htmlFor="email" >Эл. почта</Label>
                    <Input name="email" disabled={dataDisabled}  defaultValue={userData.email} required type="email" id="email" placeholder="Введите адрес эл. почты" onChange={handleChange} />
                </div>
                <div className="grid  w-1/2 max-w-sm gap-1.5 mb-4">
                    <Label htmlFor="password">Пароль</Label>
                    <Input disabled={dataDisabled} defaultValue={userData.password} required minLength={6} name="password" type="password" id="password" placeholder="Придумайте пароль" onChange={handleChange} />
                </div>
                
                {
                        dataDisabled ? (
                        <Button variant="outline" size="lg" type="button"  className="max-w-sm mb-4 w-full"  onClick={() => setDataDisabled(!dataDisabled)}> 
                            Внести изменения    
                        </Button>
                        ) : (
                            <div className="flex flex-row gap-2">
                            <Button type="reset" size="lg" variant="outline" className="max-w-sm mb-4 w-full" onClick={() => setDataDisabled(!dataDisabled)} >
                                Отменить
                            </Button>
                            <Button type="submit" size="lg" className="max-w-sm mb-4 w-full" onClick={() => setDataDisabled(!dataDisabled)} >
                                Сохранить 
                            </Button>


                            </div>
                            
                        )
                    }
                  
                
            </form>



            </div>
            <div>

            </div>
            </div>
        */}
        

    </div>
    );
};

export default SettingsPage;
