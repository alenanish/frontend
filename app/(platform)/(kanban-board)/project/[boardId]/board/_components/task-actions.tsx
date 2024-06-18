"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Select from 'react-select';
  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Plus } from "lucide-react";

import React, { useEffect, useState } from 'react';

import "@/app/style.css";
import axios from "axios";


interface Team {
  id: number,
  first_name : string,
  last_name: string,
  username : string,
  permission: string,
};


export function TaskAction({boardId, trigger, task_id, task_title, task_priority, task_description, task_deadline, task_on_board, task_assignee, task_status } 
    : {boardId: number; trigger: any; task_id: number | null; task_title: string; task_priority: string; task_description: string;  task_deadline: string | null; task_on_board: number; task_assignee: number | null; task_status: string; }) {
    const [post, setPost] = React.useState(null);


    const [selectedPriority, setSelectedPriority] = useState("");

    const handleSelectChange = (selectedOption: any) => {
        setSelectedPriority(selectedOption['value'])
      };



    const [formData, setFormData] = useState({
        id: task_id,
        title: task_title,
        description: task_description,
        deadline: task_deadline,
        on_board: task_on_board,
        assignee: task_assignee,
        status: task_status,
        priority : task_priority,

    });


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
      ...prevState,
      [name]: name === 'assignee' ? parseInt(value) : value,
      priority: selectedPriority === 'Средний' ? 'medium':  selectedPriority === 'Высокий' ? 'high': 'low',
      }));
       
    };

    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
      };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('data: ', {
        ...formData,
        
        });
      if (formData.id) {

        axios
          .patch(`http://localhost:8000/api/project/${formData.on_board}/board/${formData.id}/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('auth'),
            }
          })
          .then((response) => {
            setPost(response.data);
          });
          
        dialogClose(); 
        return;
      }

      axios
        .post(`http://localhost:8000/api/project/${formData.on_board}/board/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('auth'), 
            }
          })
        .then((response) => {
            setPost(response.data);
            });
        
        dialogClose(); 
    };

    interface Team {
        board: number;
        can_edit: boolean;
        id: number;
        participant: {
          email: string;
          id: number;
          username: string;
        }
      }
      
      const getPriority = (priority: string) => {
        if (priority === 'high'){
          return 'Высокий';
        }  
        if (priority === 'medium'){
          return 'Средний';
        }  
        return 'Низкий';
      };

          const fetchTeam = async () => {
            try {
              const response = await axios.get(`http://localhost:8000/api/project/${boardId}/team/`, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                }
              })              
              var teams = response.data

            } catch (error) {
              console.error('Ошибка при получении данных:', error);
            }
          };
      
          useEffect(() => {
              fetchTeam();
              
          }, [],
          );
      
          
    const customSelectStyles = {
      container: (baseStyles: any) => ({
        ...baseStyles,
        width: "100%",
        
      }),
      control: (baseStyles: any) => ({
        ...baseStyles,
        fontSize: "14px",
        boxSizing: "border-box",
        border: "1px solid hsl(0, 0%, 89.8%)",
        borderRadius: "6px",
        padding: "1px",
        outline: 'none',
        pointerEvents: 'auto',
        touchAction: 'auto',
        userSelect: 'none',

       "&": {
        borderColor: "none",
        boxShadow: "none",
        transition: 'none'
        },

        "&:focus-within": {
          boxShadow: "rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 0, 0) 0px 0px 0px 4px",
        },
        
        "&:hover": {
          borderColor: "none",
          boxShadow: "none",
  
        },
       
        '&:disabled': {
          pointerEvents: 'none',
          opacity: '.5',
          boxShadow: 'none',
        },

        
      }),
      
    
      indicatorSeparator: (baseStyles: any) => ({
        ...baseStyles,
        display: "none",
        }),
      valueContainer: (baseStyles: any, state: any) => ({
        ...baseStyles,
        margin: 0,
        paddingLeft: "0.5rem",
      }),
      singleValue: (baseStyles: any, state: any) => ({
        ...baseStyles,
        margin: 0,
        padding: 0,
        
      }),
      menu: (baseStyles: any) => ({
        ...baseStyles,
        zIndex: 9999,
        scroll: "vertical",
        }),
      option: (baseStyles: any, { isSelected, isFocused }: any) => ({
        ...baseStyles,
        borderRadius: "4px",
        textAlign: "center",
        padding: "4px",
        backgroundColor: isSelected ? "#A46DDA" : isFocused ? "#ECD4FF" : "transparent",
        color: isSelected ? "white" : "#333",
        cursor: "pointer",
        "&:active": {
        backgroundColor: "#F7716D",
        color: "white",
        },
       
      })
    };


    return (
        <Dialog>
        <DialogTrigger asChild>
                { trigger }
        </DialogTrigger>
        <DialogContent className=" h-fit  border-2 border-primary self-center justify-self-center w-4/6">
            <DialogHeader>
            <DialogTitle> { formData.id ? <span>Изменить задачу</span> : <span>Добавить задачу</span> }</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4" >
            <div className="grid w-full max-w-sm items-center gap-1.5">
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
            <div className="flex flex-row w-full justify-between gap-2  ">
                <div className="w-1/2 items-center gap-1.5">
                <Label htmlFor="deadline">Дедлайн</Label>
                <Input 
                    type="date" 
                    required
                    id="deadline" 
                    name="deadline"
                    defaultValue={ task_deadline ? task_deadline : ' ' }   
                    min={ new Date().toDateString() }          
                    placeholder="Дедлайн" 
                    className="w-fit" 
                    onChange={handleChange}
                />
                </div>
            </div>
            <div className="flex flex-row w-full justify-between gap-4  ">
              <div className="w-1/2 items-center gap-1.5">
                    <Label htmlFor="priority">Приоритет</Label>

                      <Select name="priority"
                        placeholder="Приоритет"
                        id="priority"
                        required
                        defaultValue={task_priority ?  { label: getPriority(task_priority), value: getPriority(task_priority) } : '' }
                        options={
                            [
                                { label: 'Высокий', value: 'Высокий' },
                                { label: 'Средний', value: 'Средний' },
                                { label: 'Низкий', value: 'Низкий' },
                            ]
                        }
                        isSearchable={false}
                        onChange={handleSelectChange}
                        styles={customSelectStyles}
                        /> 
                </div>

                <div className="w-1/2 items-center gap-1.5">
                  <Label htmlFor="assignee">Назначить</Label>
                  <Input 
                    type="number" 
                    id="assignee" 
                    name="assignee"
                    defaultValue={ task_assignee ? task_assignee : '' }           
                    placeholder="Введите уникальный номер" 
                    min={0}
                    className="w-fit" 
                    onChange={handleChange}
                />
                </div>
              </div>           
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="description">Описание задачи</Label>
                <Textarea 
                placeholder="Введите описание проекта" 
                defaultValue={task_description}
                id="description" 
                name="description"
                onChange={handleChange}
                />
            </div>
            <Button> 
                { formData.id ? <span>Сохранить изменения</span> : <span>Добавить</span> }
            </Button>
            </form>
        </DialogContent>
        </Dialog>
    );
    };

export default TaskAction;
