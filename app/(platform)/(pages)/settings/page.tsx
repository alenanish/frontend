"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    id: string, 
    username: string, 
    email: string, 
    first_name: string, 
    last_name: string,
}

const SettingsPage = () => {
    const [dataDisabled, setDataDisabled] = useState(true);
    const [user, setUser] = useState<User | null>(null); // Инициализируем user как null
    const [post, setPost] = useState('');
  
    const [formData, setFormData] = useState({
      id: '',
      username: '',
      email: '',
      first_name: '',
      last_name: '',
    });
  
    const apiURL = 'http://localhost:8000/api/settings/';
  
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('auth'),
          },
        });
  
        setUser(response.data); // Обновляем user с полученными данными
        setFormData({
          id: response.data.id, 
          username: response.data.username, 
          email: response.data.email, 
          first_name: response.data.first_name, 
          last_name: response.data.last_name,
        });
  
        console.log('form:', formData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      console.log({
        ...formData,
      });
      if (formData.id) {
        console.log(formData.id);
        axios
          .patch(apiURL, formData, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('auth'),
            },
          })
          .then((response) => {
            setPost(response.data);
            setUser(response.data); // Обновляем user после успешного обновления
            setDataDisabled(!dataDisabled);
          });
      }
    };

    return (
    <div className=" flex flex-col gap-2 items-start m-2 p-4 h-full w-2/3 " >
        <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between  ">
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
                        <Label htmlFor="first_name">Имя</Label>
                        <Input name='first_name' disabled={dataDisabled} defaultValue={formData.first_name}  required type="text" id="first_name" placeholder="Введите имя пользователя" onChange={handleChange} />
                    </div>
                    <div className="grid w-full  gap-1.5 mb-2">
                        <Label htmlFor="last_name">Фамилия</Label>
                        <Input name='last_name' disabled={dataDisabled} value={formData.last_name}  required type="text" id="last_name" placeholder="Введите имя пользователя" onChange={handleChange} />
                    </div>
                </div>
                <div className="grid w-1/2 max-w-sm gap-1.5 mb-4">
                    <Label htmlFor="username" >Эл. почта</Label>
                    <Input name="username" disabled={dataDisabled}  value={formData.username} required type="text" id="username" placeholder="Введите адрес эл. почты" onChange={handleChange} />
                </div>
                <div className="grid w-1/2 max-w-sm gap-1.5 mb-4">
                    <Label htmlFor="email" >Эл. почта</Label>
                    <Input name="email" disabled={dataDisabled}  value={formData.email} required type="email" id="email" placeholder="Введите адрес эл. почты" onChange={handleChange} />
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
                            <Button type="submit" size="lg" className="max-w-sm mb-4 w-full"  >
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
    </div>
    );
};

export default SettingsPage;
