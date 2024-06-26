'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Trash2, X, Calendar, PenLine } from 'lucide-react'

import { Draggable } from '@hello-pangea/dnd'

import TaskAction from './task-actions'
import axios from 'axios'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@radix-ui/react-hover-card'

const TaskCard = ({
    id,
    index,
    title,
    description,
    deadline,
    priority,
    on_board,
    assignee,
    status,
    refreshPage,
}: {
    id: number
    index: number
    title: string
    description: string
    deadline: string
    priority: string
    on_board: number
    assignee: number | null
    status: string
    refreshPage: any
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:8000/api/project/${on_board}/board/${id}/`,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('auth'),
                    },
                }
            )
            refreshPage()

        } catch (error) {
            console.error('Ошибка при удалении проекта:', error)
        }
    }

    return (
        <Draggable key={id} draggableId={String(id)} index={index}>
            {(provided, snapshot) => (
                <article
                    className={`bg-white  border-2 border-primary flex flex-col items-stretch p-3 gap-2
                          shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md w-full h-[200px] +  ${snapshot.isDragging ? ' ' : ''}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="flex flex-row justify-between">
                        <div
                            className={`${priority === 'high' ? ' bg-accent/10  border-accent/40 text-accent' : ''} 
                    
                    ${priority === 'medium' ? ' bg-[#F8D7B5]  border-[#CD8F3C] text-[#A16500]' : ''}
                    ${priority === 'low' ? 'bg-green-100  border-green-400 text-green-600' : ''}
                    
                    flex flex-row border text-sm h-fit items-center gap-1 rounded-md p-1`}
                        >
                            {priority === 'high'
                                ? 'Высокий'
                                : priority === 'medium'
                                  ? 'Средний'
                                  : 'Низкий'}
                        </div>

                        <div
                            className={`border border-black ${isOpen ? ' border-primary ' : ' border-white'} border self-end flex flex-row-reverse gap-1 bg-white rounded-lg m-0 p-0`}
                        >
                            <Button
                                size="icon"
                                type="button"
                                variant={isOpen ? 'outline' : 'ghost'}
                                onClick={handleOpenDropdown}
                            >
                                {isOpen ? (
                                    <X size={20} className="w-5 h-5" />
                                ) : (
                                    <EllipsisVertical size={20} />
                                )}
                            </Button>
                            {isOpen && (
                                <div className="flex gap-1 ">
                                    <Button
                                        size="icon"
                                        type="button"
                                        variant="secondary"
                                        className="hover:bg-destructive/10 "
                                        onClick={handleDelete}
                                    >
                                        <Trash2
                                            size={20}
                                            className=" group-hover:stroke-destructive"
                                        />
                                    </Button>
                                    <TaskAction
                                        boardId={on_board}
                                        task_id={id}
                                        task_title={title}
                                        task_priority={priority}
                                        task_description={description}
                                        task_deadline={deadline}
                                        task_on_board={on_board}
                                        task_assignee={assignee}
                                        task_status={status}
                                        refreshPage={refreshPage}
                                        trigger={
                                            <Button
                                                size="icon"
                                                type="button"
                                                variant="secondary"
                                                className="hover:bg-[#D5DDEE] "
                                            >
                                                <PenLine
                                                    size={20}
                                                    className="  group-hover:stroke-[#6D88B0]"
                                                />
                                            </Button>
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className="flex flex-col h-full"
                        {...provided.dragHandleProps}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col content-start items-start relative h-full justify-center  ">
                                <HoverCard>
                                    <HoverCardTrigger
                                        className=" self-center absolute top-0  h-it w-fit   "
                                        asChild
                                    >
                                        <Button
                                            className=" font-medium text-neutral-800 "
                                            variant="link"
                                        >
                                            {title}
                                        </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-[200px]">
                                        <div className="flex justify-between h-full ">
                                            <p className=" w-full text-sm text-center content-center">
                                                {description
                                                    ? description
                                                    : 'Нет описания'}
                                            </p>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>

                            <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex flex-row items-center gap-1 w-full rounded-md text-neutral-800 text-sm stroke-neutral-700">
                                    <Calendar size={16} />
                                    {deadline.split('-').reverse().join('.')}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            )}
        </Draggable>
    )
}

export default TaskCard
