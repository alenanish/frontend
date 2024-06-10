"use client"

import { Button } from "@/components/ui/button";
import AddTask from "../../../_components/add-task";
import { Plus } from "lucide-react";
import TaskCard from "../../../_components/task-card";


export default function BoardPage({ params }: { params: { projectId: any } }) {

  const Tasks = [ 
    {id: 1, title: "Задача 1", description: "Описание 1", deadline: "2024-06-12", priority: 'Средний', boardId: 2, status: 'to-do'},
    {id: 2, title: "Задача 2", description: "Описание 2", deadline: "2024-05-01", priority: 'Высокий', boardId: 1, status: 'done'},
    {id: 3, title: "Задача 3", description: "Описание 3", deadline: "2023-05-12", priority: 'Низкий', boardId: 2, status: 'in-progress'},
    {id: 4, title: "Задача 4", description: "Описание 4", deadline: "2024-10-12", priority: 'Средний', boardId: 5, status: 'to-do'},
    {id: 5, title: "Задача ", description: "", deadline: "2024-05-12", priority: 'Высокий',  boardId: 2, status: 'to-do'},
    {id: 6, title: "Задача Задача Задача Задача", description: "", deadline: "2024-05-12", priority: 'Низкий',  boardId: 2, status: 'to-do'},
        
]

  return (
  <div className="w-full">
    <div className="w-fit h-fit absolute top-10 right-6">
      <AddTask projectId={params.projectId} status="to-do" triger={<Button type="button" variant="default" className="sm:px-2 md:gap-2">                    
            <Plus />
            <span className="hidden md:block">
                Добавить задачу
            </span>                       
            </Button>}/>

    </div>
    <main className=" mx-6 flex flex-row gap-6">
        <div className="flex w-1/3 flex-col">
          <div className="flex w-full font-medium text-lg items-center justify-between px-4 py-3 border-b border-[#212121] mb-3">
            Сделать
            <AddTask projectId={params.projectId} taskId={1} status="to-do" triger={<Button size="icon" variant="secondary"> <Plus /> </Button>}/>
          </div>
          <div className="m-2 flex flex-col gap-4">
            {
              Tasks.map((task, index) => (
                task.status === 'to-do'?
                  <TaskCard key={index} id={task.id} title={task.title} description={task.description} deadline={task.deadline} board={task.boardId} priority={task.priority} />  
                : ""
                    )) 
            }
            </div>


        </div>
        <div className="flex w-1/3 flex-col">
        <div className="flex w-full font-medium text-lg items-center justify-between px-4 py-3 border-b border-[#212121]">
            В процессе
            <AddTask projectId={params.projectId} status="in-progress" triger={<Button size="icon" variant="secondary"> <Plus /> </Button>}/>

          </div>

        </div>
        <div className="flex w-1/3 flex-col">
        <div className="flex w-full font-medium text-lg items-center justify-between px-4 py-3 border-b border-[#212121]">
            Сделано
            <AddTask projectId={params.projectId} status="done" triger={<Button size="icon" variant="secondary"> <Plus /> </Button>}/>

          </div>
          
        </div>

    </main>

   
  
  
  </div>

  );
};