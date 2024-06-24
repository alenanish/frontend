'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PenLine, Plus } from 'lucide-react'

import React, { useState } from 'react'

import '@/app/style.css'
import axios from 'axios'

export function BoardAction({
    board_id,
    board_title,
    board_progress,
    board_description,
    refreshPage,
}: {
    board_id: number | null
    board_title: string
    board_progress: number
    board_description: string
    refreshPage: any
}) {
    const [post, setPost] = React.useState(null)

    const [formData, setFormData] = useState({
        id: board_id,
        title: board_title,
        description: board_description,
        progress: board_progress,
    })

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const dialogClose = () => {
        document.getElementById('closeDialog')?.click()
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log({
            ...formData,
        })
        if (formData.id) {
            axios
                .patch(
                    `http://localhost:8000/api/boards/${formData.id}/`,
                    formData,
                    {
                        headers: {
                            Authorization:
                                'Bearer ' + localStorage.getItem('auth'),
                        },
                    }
                )
                .then((response) => {
                    setPost(response.data)
                    dialogClose()
                    refreshPage()
                })

            return
        }

        axios
            .post('http://localhost:8000/api/boards/', formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('auth'),
                },
            })
            .then((response) => {
                setPost(response.data)
                refreshPage()
                dialogClose()
            })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {formData.id ? (
                    <Button
                        size="icon"
                        type="button"
                        variant="secondary"
                        className="hover:bg-[#D5DDEE] "
                    >
                        <PenLine
                            size={20}
                            className=" group-hover:stroke-[#6D88B0]"
                        />
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="default"
                        className="sm:px-2 md:gap-2"
                    >
                        <Plus />
                        <span className="hidden md:block">Создать проект</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className=" h-fit w-max border-2 border-primary self-center justify-self-center md:w-2/6">
                <DialogHeader>
                    <DialogTitle>
                        {' '}
                        {formData.id ? (
                            <span>Изменить проект</span>
                        ) : (
                            <span>Добавить проект</span>
                        )}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="title">Название</Label>
                        <Input
                            required
                            defaultValue={board_title}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Введите название"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="description">Описание проекта</Label>
                        <Textarea
                            placeholder="Введите описание проекта"
                            defaultValue={board_description}
                            id="description"
                            name="description"
                            onChange={handleChange}
                        />
                    </div>
                    <Button>
                        {formData.id ? (
                            <span>Сохранить изменения</span>
                        ) : (
                            <span>Добавить</span>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default BoardAction
