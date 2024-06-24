'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import { EyeIcon, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface User {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
}

const SettingsPage = () => {
    const [dataDisabled, setDataDisabled] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [post, setPost] = useState('')
    const router = useRouter()
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        email: '',
        first_name: '',
        last_name: '',
    })

    const apiURL = 'http://localhost:8000/api/settings/'

    const fetchData = async () => {
        try {
            const response = await axios.get(apiURL, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('auth'),
                },
            })

            setUser(response.data)
            console.log(response.data)
            setFormData({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
            })
        } catch (error) {
            console.error('Ошибка при получении данных:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const hadleCancel = () => {
        setFormData({
            id: user?.id || '',
            username: user?.username || '',
            email: user?.email || '',
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
        })

        setDataDisabled(!dataDisabled)
        router.refresh()
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (formData.id) {
            axios
                .patch(apiURL, formData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('auth'),
                    },
                })
                .then((response) => {
                    setPost(response.data)
                    setUser(response.data)
                    router.refresh()
                    setDataDisabled(!dataDisabled)
                })
        }
    }

    const [showId, setShowId] = useState(false)

    const handleClick = () => {
        setShowId(!showId)
    }

    return (
        <div className=" flex flex-col gap-2 items-start m-2 p-4 h-full w-2/3 ">
            <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between  ">
                <h1 className="block text-3xl font-medium text-neutral-800">
                    Настройки
                </h1>
            </div>
            <div
                className="bg-white flex flex-wrap gap-4 border-2 border-primary items-stretch p-3
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md h-ful w-full"
            >
                <div className="w-full">
                    <div className="flex flex-row items-center  text-xl font-medium text-neutral-800 border-b border-neutral-700 mb-3 p-2">
                        <h1 className=" text-xl font-medium text-neutral-800">
                            Персональная информация
                        </h1>
                        <div className='flex items-center  flex-row justify-between'>
                            <Button size="icon" variant="secondary"  onClick={handleClick}>
                              {
                                showId?
                                <EyeIcon />
                                :
                                <EyeOff />
                              }

                            </Button>
                            {showId && <div className='text-neutral-800'>ID: {formData.id}</div>}
                        </div>
                    </div>
                    <form
                        className="w-full flex-col flex"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-row gap-2">
                            <div className="grid w-full  gap-1.5 mb-2">
                                <Label htmlFor="first_name">Имя</Label>
                                <Input
                                    name="first_name"
                                    disabled={dataDisabled}
                                    value={formData.first_name}
                                    required
                                    type="text"
                                    id="first_name"
                                    placeholder="Введите имя"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid w-full  gap-1.5 mb-2">
                                <Label htmlFor="last_name">Фамилия</Label>
                                <Input
                                    name="last_name"
                                    disabled={dataDisabled}
                                    value={formData.last_name}
                                    required
                                    type="text"
                                    id="last_name"
                                    placeholder="Введите фамилию"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid w-1/2 max-w-sm gap-1.5 mb-4">
                            <Label htmlFor="username">Имя пользователя</Label>
                            <Input
                                name="username"
                                disabled={dataDisabled}
                                value={formData.username}
                                required
                                type="text"
                                id="username"
                                placeholder="Введите имя пользователя"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid w-1/2 max-w-sm gap-1.5 mb-4">
                            <Label htmlFor="email">Эл. почта</Label>
                            <Input
                                name="email"
                                disabled={dataDisabled}
                                value={formData.email}
                                required
                                type="email"
                                id="email"
                                placeholder="Введите адрес эл. почты"
                                onChange={handleChange}
                            />
                        </div>

                        {dataDisabled ? (
                            <Button
                                variant="outline"
                                size="lg"
                                type="button"
                                className="mb-4 w-1/2"
                                onClick={() => setDataDisabled(!dataDisabled)}
                            >
                                Внести изменения
                            </Button>
                        ) : (
                            <div className="flex flex-row gap-2">
                                <Button
                                    type="reset"
                                    size="lg"
                                    variant="outline"
                                    className="max-w-sm mb-4 w-full"
                                    onClick={hadleCancel}
                                >
                                    Отменить
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="max-w-sm mb-4 w-full"
                                >
                                    Сохранить
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default SettingsPage
