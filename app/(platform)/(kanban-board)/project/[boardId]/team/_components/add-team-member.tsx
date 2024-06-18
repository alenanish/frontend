import React, { useState } from 'react';

import { UserRoundPlus } from 'lucide-react';
import { Button, } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';


function AddTeamMemberButton( {board_id, refreshPage} : {board_id: number; refreshPage: any} ) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const [formData, setFormData] = useState({
    id: '',
    board: board_id,
    participant_id: '',
    can_edit: false,
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value,
        }));

    };

    function handleSubmit (e : any) {
        e.preventDefault();
        console.log('Received values of form: ', formData);
        setIsFormVisible(false);
        handleAdd(formData);
      };

      const handleAdd = async (formData: any) => {
        try {
 
         const response = await axios.post(`http://localhost:8000/api/project/${board_id}/team/`, formData, {
           headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('auth'),
           }
         });      
                         
       } catch (error) {
         console.error('Ошибка при добавлении участника:', error);
       }
       refreshPage();
   };

  return (
    <div>
      <Button type="button" variant="default" className="w-fit h-fit absolute top-10 right-6 sm:px-2 md:gap-2 mb-2" onClick={handleButtonClick}>
        <UserRoundPlus />
        <span className="hidden md:block">
          Добавить участника
        </span>
      </Button>

      {isFormVisible && (
        <form className='absolute top-6 right-6  rounded-sm border-2 bg-white p-2 mt-1 ' onSubmit={handleSubmit}>
            <div className=" grid w-full max-w-sm items-center gap-1.5 mb-2">
                    <Label htmlFor="participant_id">Имя пользователя</Label>
                    <Input required type="text" name="participant_id" id="participant_id" placeholder="Введите уникальный номер" onChange={handleChange} />
                </div>
            <div className='flex flex-row gap-2'>
          <Button className='w-full' variant="default" size="sm" type="submit" >
            Добавить
          </Button>
          <Button className='w-full' variant="outline" size="sm" type='button' onClick={() => setIsFormVisible(false)}>
            Отменить
          </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddTeamMemberButton;

