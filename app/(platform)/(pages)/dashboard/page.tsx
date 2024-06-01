import React from 'react'; 
import axios from 'axios';
import Card  from './_components/card'
import  AddProject  from "./_components/add-project";


const DashboardPage = () => {
    const Projects = [ 
        {id: 1, title: "Проект 1", description: "Проект 1",  progress: 20, deadline: "12.06.2024", priority: 'средний'},
        {id: 2, title: "Проект 2", description: "Проект 2", progress: 70, deadline: "01.05.2024", priority: 'высокий'},
        {id: 3, title: "Проект 3", description: "Проект 3", progress: 100, deadline: "12.05.2023", priority: 'низкий'},
        {id: 4, title: "Проекты 4", description: "Проект 4", progress: 0, deadline: "12.10.2024", priority: 'средний'},
        {id: 5, title: "Проекты ", description: "", progress: 0, deadline: "12.05.2024", priority: 'высокий'},
        {id: 6, title: "Проекты Проекты Проекты Проекты Проекты", description: "", progress: 0, deadline: "12.05.2024", priority: 'низкий'},
            
    ]

    return (
        <div className=" flex flex-col gap-2 items-start m-2 p-4" >

            <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between ">
                <h1 className="block text-3xl font-medium text-neutral-800">
                    Проекты
                </h1>
                <AddProject />
            </div>
            
            <div className="flex flex-wrap gap-4">
                {
                    Projects.map((project, index) => (
                        <Card key={index} id={ project.id } title={ project.title } description={project.description} progress={ project.progress } priority={ project.priority } deadline={ project.deadline } />
                    ))   
                }
            </div>
        </div>
    );
};

export default DashboardPage;
