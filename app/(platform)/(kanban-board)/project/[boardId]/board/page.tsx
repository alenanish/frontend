"use client"

import { Button } from "@/components/ui/button";
import {  Plus } from "lucide-react";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { useEffect, useState } from "react";
import axios from "axios";
import TaskAction from "./_components/task-actions";
import { Column } from "./_components/column";



export default function BoardPage({ params }: { params: { boardId: number } }) {

  interface Task {
    id: number,
    title : string,
    description: string,
    deadline : string,
    priority: string,
    on_board: number,
    created_at: string,
    status: string,
    assignee: string,
};



const [Tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/project/${params.boardId}/board/`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth'),
          }
        })

        setTasks(response.data);
        console.log('Tasks: ', response.data)
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    useEffect(() => {
        fetchData();
    }, [],
    );

  const Columns = [
    {id: 0, name: 'Сделать', status: 'to-do'},
    {id: 1, name: 'В процессе', status: 'in-progress'},
    {id: 2, name: 'Сделано', status: 'completed'},
  ]


  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;

    if (sourceColumn === destinationColumn) return; // Карточка перетаскивалась внутри того же столбца

    const updatedCards = [...Tasks];
    const cardIndex = updatedCards.findIndex(
      (task) => task.id === result.draggableId
    );
    const [reorderedCard] = updatedCards.splice(cardIndex, 1);
    console.log('destCol', destinationColumn)

    reorderedCard.status = destinationColumn; // Обновляем столбец карточки

    updatedCards.splice(result.destination.index, 0, reorderedCard);

    setTasks(updatedCards);

    console.log(reorderedCard)

    axios          
    .patch(`http://localhost:8000/api/project/${params.boardId}/board/${reorderedCard.id}/`, reorderedCard, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth'), 
        }
      })
    .then((response) => {

        });
    
    return;
  };

  return (
  <div className="w-full">
    <div className="w-fit h-fit absolute top-10 right-6">
      <TaskAction boardId={params.boardId} task_id={null} task_title={''} task_priority={''} task_description={''} task_created_at={ '' } task_deadline={null} task_on_board={params.boardId} task_assignee={null} task_status={'to-do'}
        trigger={
          <Button type="button" variant="default" className="sm:px-2 md:gap-2">
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
        {
          Columns.map((col, index) => (
            <Column key={index} id={col.id} name={col.name} status={col.status} boardId={params.boardId} Tasks={Tasks?.filter((task: Task) => task.status === col.status)}/>))
        }
      </DragDropContext>
      
    </main>

   
  
  
  </div>

  );
};