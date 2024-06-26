'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Select from 'react-select'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CircleAlert, PenLine, Plus } from 'lucide-react'

import React, { useEffect, useState } from 'react'

import '@/app/style.css'
import axios from 'axios'
import ErrorDisplay from '@/components/ui/errorDisplay'

export function TaskAction({
    boardId,
    trigger,
    task_id,
    task_title,
    task_priority,
    task_description,
    task_deadline,
    task_on_board,
    task_assignee,
    task_status,
    refreshPage,
}: {
    boardId: number
    trigger: any
    task_id: number | null
    task_title: string
    task_priority: string
    task_description: string
    task_deadline: string | null
    task_on_board: number
    task_assignee: number | null
    task_status: string
    refreshPage: any
}) {
    const [dateErr, setDateErr] = useState('')
    const [assigneeErr, setAssigneeErr] = useState('')

    const getPriority = (priority: string) => {
        if (priority === 'high') {
            return 'Высокий'
        }
        if (priority === 'medium') {
            return 'Средний'
        }
        return 'Низкий'
    }
    const [selectedPriority, setSelectedPriority] = useState(
        getPriority(task_priority)
    )

    const handleSelectChange = (selectedOption: any) => {
        setSelectedPriority(selectedOption['value'])
    }

    const [formData, setFormData] = useState({
        id: task_id,
        title: task_title,
        description: task_description,
        deadline: task_deadline,
        on_board: task_on_board,
        assignee: task_assignee,
        status: task_status,
        priority: task_priority,
    })

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'assignee' ? parseInt(value) : value,
            priority:
                selectedPriority === 'Средний'
                    ? 'medium'
                    : selectedPriority === 'Высокий'
                      ? 'high'
                      : 'low',
        }))
    }

    const dialogClose = () => {
        setAssigneeErr('')
        setDateErr('')
        document.getElementById('closeDialog')?.click()
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log('data: ', {
            ...formData,
        })
        if (formData.id) {
            changeTask(formData)
            return
        }
        createTask(formData)
    }

    const createTask = async (formData: {
        id?: number | null
        title?: string
        description?: string
        deadline?: string | null
        on_board: any
        assignee?: number | null
        status: string
        priority?: string
    }) => {
        try {
            const response = await axios
                .post(
                    `http://localhost:8000/api/project/${formData.on_board}/board/`,
                    formData,
                    {
                        headers: {
                            Authorization:
                                'Bearer ' + localStorage.getItem('auth'),
                        },
                    }
                )
                .then((response) => {
                    console.log(response)
                    if (response.status >= 200 && response.status < 400) {
                        refreshPage()
                        dialogClose()
                    }
                })
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                var err = error.response?.data
                setDateErr(err.deadline)
                setAssigneeErr(err.assignee)
            } else {
                console.error(error)
            }
        }
    }

    const changeTask = async (formData: {
        id?: number | null
        title: string
        description?: string
        deadline: string | null
        on_board: any
        assignee: number | null
        status: string
        priority: string
    }) => {
        
        try {
            const response = await axios
                .patch(
                    `http://localhost:8000/api/project/${formData.on_board}/board/${formData.id}/`,
                    formData,
                    {
                        headers: {
                            Authorization:
                                'Bearer ' + localStorage.getItem('auth'),
                        },
                    }
                )
                .then((response) => {
                    if (response.status >= 200 && response.status < 400) {
                        refreshPage()
                        dialogClose()
                    }
                })
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                var err = error.response?.data
                setDateErr(err.deadline)
                setAssigneeErr(err.assignee)
            } else {
                console.error(error)
            }
        }
    }

    const customSelectStyles = {
        container: (baseStyles: any) => ({
            ...baseStyles,
            width: '100%',
        }),
        control: (baseStyles: any) => ({
            ...baseStyles,
            fontSize: '14px',
            boxSizing: 'border-box',
            border: '1px solid hsl(0, 0%, 89.8%)',
            borderRadius: '6px',
            padding: '1px',
            outline: 'none',
            pointerEvents: 'auto',
            touchAction: 'auto',
            userSelect: 'none',

            '&': {
                borderColor: 'none',
                boxShadow: 'none',
                transition: 'none',
            },

            '&:focus-within': {
                boxShadow:
                    'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 0, 0) 0px 0px 0px 4px',
            },

            '&:hover': {
                borderColor: 'none',
                boxShadow: 'none',
            },

            '&:disabled': {
                pointerEvents: 'none',
                opacity: '.5',
                boxShadow: 'none',
            },
        }),

        indicatorSeparator: (baseStyles: any) => ({
            ...baseStyles,
            display: 'none',
        }),
        valueContainer: (baseStyles: any, state: any) => ({
            ...baseStyles,
            margin: 0,
            paddingLeft: '0.5rem',
        }),
        singleValue: (baseStyles: any, state: any) => ({
            ...baseStyles,
            margin: 0,
            padding: 0,
        }),
        menu: (baseStyles: any) => ({
            ...baseStyles,
            zIndex: 9999,
            scroll: 'vertical',
        }),
        option: (baseStyles: any, { isSelected, isFocused }: any) => ({
            ...baseStyles,
            borderRadius: '4px',
            textAlign: 'center',
            padding: '4px',
            backgroundColor: isSelected
                ? '#A46DDA'
                : isFocused
                  ? '#ECD4FF'
                  : 'transparent',
            color: isSelected ? 'white' : '#333',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: '#F7716D',
                color: 'white',
            },
        }),
    }

    return (
        <Dialog
            onOpenChange={() => {
                setAssigneeErr('')
                setDateErr('')
            }}
        >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className=" h-fit  border-2 border-primary self-center justify-self-center w-4/6">
                <DialogHeader>
                    <DialogTitle>
                        {formData.id ? (
                            <span>Изменить задачу</span>
                        ) : (
                            <span>Добавить задачу</span>
                        )}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="grid w-full items-center gap-1 mb-6">
                            <Label htmlFor="title">Название</Label>
                            <Input
                                required
                                defaultValue={task_title}
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Введите название"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-row w-full gap-4  ">
                            <div className="grid w-full items-center gap-1">
                                <Label htmlFor="priority">Приоритет</Label>
                                <Select
                                    name="priority"
                                    placeholder="Приоритет"
                                    id="priority"
                                    required
                                    defaultValue={
                                        task_priority
                                            ? {
                                                  label: getPriority(
                                                      task_priority
                                                  ),
                                                  value: getPriority(
                                                      task_priority
                                                  ),
                                              }
                                            : ''
                                    }
                                    options={[
                                        { label: 'Высокий', value: 'Высокий' },
                                        { label: 'Средний', value: 'Средний' },
                                        { label: 'Низкий', value: 'Низкий' },
                                    ]}
                                    isSearchable={false}
                                    onChange={handleSelectChange}
                                    styles={customSelectStyles}
                                />
                                <div className="h-3"></div>
                            </div>
                            <div className="grid w-full items-center ">
                                <Label htmlFor="deadline">Дедлайн</Label>
                                <div className="flex flex-row items-center gap-x-1">
                                    <Input
                                        type="date"
                                        required
                                        id="deadline"
                                        name="deadline"
                                        defaultValue={
                                            task_deadline ? task_deadline : ' '
                                        }
                                        min={new Date().toDateString()}
                                        placeholder="Дедлайн"
                                        className="w-fit"
                                        onChange={handleChange}
                                    />
                                    {dateErr ? (
                                        <CircleAlert className="stroke-destructive" />
                                    ) : (
                                        <div className="w-6 h-6"></div>
                                    )}
                                </div>
                                {dateErr ? (
                                    <ErrorDisplay message={dateErr} />
                                ) : (
                                    <div className="h-3"></div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-between gap-2  ">
                            <div className=" items-center gap-1">
                                <Label htmlFor="assignee">Назначить</Label>
                                <div className="flex flex-row items-center gap-x-1">
                                    <Input
                                        type="number"
                                        id="assignee"
                                        name="assignee"
                                        defaultValue={
                                            task_assignee ? task_assignee : ''
                                        }
                                        placeholder="Введите уникальный номер"
                                        min={0}
                                        required
                                        className="w-fit"
                                        onChange={handleChange}
                                    />
                                    {assigneeErr ? (
                                        <CircleAlert className="stroke-destructive" />
                                    ) : (
                                        <div className="w-6 h-6"></div>
                                    )}
                                </div>
                                {assigneeErr ? (
                                    <ErrorDisplay message={assigneeErr} />
                                ) : (
                                    <div className="h-3"></div>
                                )}
                            </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1 mt-2 mb-3">
                            <Label htmlFor="description">Описание задачи</Label>
                            <Textarea
                                placeholder="Введите описание проекта"
                                defaultValue={task_description}
                                id="description"
                                name="description"
                                onChange={handleChange}
                            />
                        </div>
                        <Button className="mt-3">
                            {formData.id ? (
                                <span>Сохранить изменения</span>
                            ) : (
                                <span>Добавить</span>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TaskAction
