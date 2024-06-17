"use client";

import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Task from './_components/task';


const TasksPage = () => {
    interface Task {
        id: number,
        title : string, 
        description: string,
        deadline : string, 
        priority: string,
        on_board: number,
    };

    const [Tasks, setTasks] = useState([]);

    const apiURL = "http://127.0.0.1:8000/api/tasks/";

    const fetchData = async () => {
        try {
          const response = await axios.get(apiURL, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('auth'),
            }
          }) 
          console.log(response.data)
          setTasks(response.data);
          console.log(Tasks)
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };

    useEffect(() => {
        fetchData(); 
    }, [], 
    ); 
    

    return (
        <div className=" flex flex-col gap-2 items-start m-2 p-4 h-full " >

            <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between ">
                <h1 className="block text-3xl font-medium text-neutral-800">
                    Задачи
                </h1>
               
            </div>
            
            <div className="bg-white w-full gap-4 border-2 border-primary items-stretch p-3
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md h-full">
            <article className="flex w-full h-fit p-1 border-b border-neutral-500" >
  
                <div className="w-1/5  font-medium">Название</div>
                <div className='w-1/5 '>Дедлайн</div>
                <div className="w-1/5 ">
                            Приоритет
                        </div>
                <div className="w-1/5  text-clip">Описание</div>
                <div  className="w-1/5">Подробнее</div>
                    
            </article>
                
                { Tasks.length === 0?

                <span className=' text-neutral-700'>Нет задач</span>

                :
                    Tasks.map((task: Task, index : number) => (
                        <Task key={index} id={task.id}  title={ task.title } description={task.description} priority={ task.priority } deadline={ task.deadline } on_board={task.on_board}/>
                    ))   
                }
            </div>
        </div>
    );
};

export default TasksPage;
