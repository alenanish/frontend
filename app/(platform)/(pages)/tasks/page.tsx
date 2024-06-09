import React from 'react'; 
import axios from 'axios';
import Task from './_components/task';


const TasksPage = () => {
    const Tasks = [ 
        {id: 1, title: "За 1", description: "задача 1",  deadline: "2024-06-12", priority: 'Средний', board: '2'},
        {id: 2, title: "Задача 2", description: "", deadline: "2024-06-12", priority: 'Высокий', board: '3'},
        {id: 3, title: "Задача 3", description: "jdfak jsdnfsa", deadline: "2024-06-12", priority: 'Низкий', board: '2'},
        {id: 4, title: "Задача 4", description: "",  deadline: "2024-06-12", priority: 'Средний', board: '5'},
        {id: 5, title: "Задача 5", description: "sljkl k", deadline: "2024-06-12", priority: 'Средний', board: '1'},


    ];

    return (
        <div className=" flex flex-col gap-2 items-start m-2 p-4 h-full " >

            <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between ">
                <h1 className="block text-3xl font-medium text-neutral-800">
                    Задачи
                </h1>
               
            </div>
            
            <div className="bg-white flex flex-wrap gap-4 border-2 border-primary items-stretch p-3
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
                
                {
                    Tasks.map((task, index) => (
                        <Task key={index} id={task.id}  title={ task.title } description={task.description} priority={ task.priority } deadline={ task.deadline } board={task.board}/>
                    ))   
                }
            </div>
        </div>
    );
};

export default TasksPage;
