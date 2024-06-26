'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

import { useEffect, useState } from 'react'
import axios from 'axios'
import TaskAction from './_components/task-actions'
import { Column } from './_components/column'

export default function BoardPage({ params }: { params: { boardId: number } }) {
    interface Task {
        id: number
        title: string
        description: string
        deadline: string
        priority: string
        on_board: number
        created_at: string
        status: string
        assignee: string
    }

    const [tasks, setTasks] = useState<Task[]>([])

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/project/${params.boardId}/board/`,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('auth'),
                    },
                }
            )

            setTasks(response.data)
            console.log('Tasks: ', response.data)
        } catch (error) {
            console.error('Ошибка при получении данных:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const Columns = [
        { id: 0, name: 'Сделать', status: 'to-do' },
        { id: 1, name: 'В процессе', status: 'in-progress' },
        { id: 2, name: 'Сделано', status: 'completed' },
    ]

    const handleOnDragEnd = async (result: any) => {
        if (!result.destination) return

        const sourceColumn = result.source.droppableId
        const destinationColumn = result.destination.droppableId
        console.log('srcCol', destinationColumn)
        console.log('destCol', destinationColumn)

        if (sourceColumn === destinationColumn) return

        console.log('id', result.draggableId)

        const updatedCards = [...tasks]
        const cardIndex = updatedCards.findIndex(
            (task) => task.id === Number(result.draggableId)
        )
        const [reorderedCard] = updatedCards.splice(cardIndex, 1)

        reorderedCard.status = destinationColumn

        updatedCards.splice(result.destination.index, 0, reorderedCard)

        setTasks(updatedCards)

        try {
            const response = await axios.patch(
                `http://localhost:8000/api/project/${params.boardId}/board/${reorderedCard.id}/`,
                reorderedCard,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('auth'),
                    },
                }
            )
            console.log('Task updated successfully:', response.data)
        } catch (error) {
            console.error('Error updating task:', error)
        }
    }

    return (
        <div className="w-full">
            <div className="w-fit h-fit absolute top-10 right-6">
                <TaskAction
                    boardId={params.boardId}
                    task_id={null}
                    task_title={''}
                    task_priority={''}
                    task_description={''}
                    task_deadline={null}
                    task_on_board={params.boardId}
                    task_assignee={null}
                    task_status={'to-do'}
                    refreshPage={fetchData}
                    trigger={
                        <Button
                            type="button"
                            variant="default"
                            className="sm:px-2 md:gap-2"
                        >
                            <Plus />
                            <span className="hidden md:block">
                                Добавить задачу
                            </span>
                        </Button>
                    }
                />
            </div>
            <main className=" mx-6 flex flex-row gap-6">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    {Columns.map((col, index) => (
                        <Column
                            id={col.id}
                            key={col.id}
                            name={col.name}
                            status={col.status}
                            boardId={params.boardId}
                            refreshPage={fetchData}
                            Tasks={tasks?.filter(
                                (task: Task) => task.status === col.status
                            )}
                        />
                    ))}
                </DragDropContext>
            </main>
        </div>
    )
}
