"use client"

import { Button } from "@/components/ui/button";
import { PenLine, Plus } from "lucide-react";
import TaskAction from "../../../_components/task-actions";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Column } from "../../../_components/column";



export default function BoardPage({ params }: { params: { boardId: number } }) {
  
  var Tasks = [ 
    {id: 1, title: "Задача 1", description: "Описание 1", deadline: "2024-06-12", created_at: "2021-06-12", priority: 'Средний', status: 'to-do', asignee: ''},
    {id: 2, title: "Задача 2", description: "Описание 2", deadline: "2024-05-01", created_at: "2022-06-12",  priority: 'Высокий',  status: 'completed', asignee: ''},
    {id: 3, title: "Задача 3", description: "Описание 3", deadline: "2023-05-12",created_at: "2023-06-12",  priority: 'Низкий',  status: 'in-progress', asignee: ''},
    {id: 4, title: "Задача 4", description: "Описание 4", deadline: "2024-10-12",created_at: "2021-06-12",  priority: 'Средний', status: 'to-do', asignee: ''},
    {id: 5, title: "Задача ", description: "", deadline: "2024-05-12", created_at: "2021-06-12",  priority: 'Высокий',   status: 'to-do', asignee: ''},
    {id: 6, title: "Задача Задача Задача Задача", description: "", deadline: "2024-05-12",  created_at: "2020-06-12", priority: 'Низкий', status: 'to-do', asignee: ''},
        
  ]


  const Columns = [
    {id: 0, name: 'Сделать', value: 'to-do'},
    {id: 1, name: 'В процессе', value: 'in-progress'},
    {id: 2, name: 'Сделано', value: 'completed'},

  ] 



  return (
  <div className="w-full">
    <div className="w-fit h-fit absolute top-10 right-6">
      <TaskAction  task_id={null} task_title={''} task_priority={''} task_description={''} task_created_at={ '' } task_deadline={null} task_on_board={params.boardId} task_assignee={null} task_status={'to-do'}
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
        {
          Columns.map((col, index) => (
            <Column key={index} id={col.id} index={index} name={col.name} value={col.value} boardId={params.boardId} Tasks={Tasks.filter((task) => task.status === col.value)}/>))
        }
      
    </main>

   
  
  
  </div>

  );
};