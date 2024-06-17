import React, { useState, useEffect } from 'react';
import './calendar.css';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface Event {
  id: number; 
  deadline: string; 
  title: string;
  priority: string;
  on_board: number,

}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

const apiURL = "http://localhost:8000/api/calendar/";

const fetchData = async () => {
    try {
      const response = await axios.get(apiURL, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth'),
            }
        }) 
        console.log(response.data)
        setEvents(response.data);
        
        } catch (error) {
        console.error('Ошибка при получении данных:', error);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [], 
    ); 



  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

 
  const generateCalendar = (): { day: number | null; isCurrentMonth: boolean }[] => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = new Date(year, month, 0).getDay(); // 0 (Sunday) - 6 (Saturday)

    const calendar: { day: number | null; isCurrentMonth: boolean }[] = [];


    let dayIndex = 0;
    for (let i = 0; i < 7; i++) {
      if (i >= firstDay) {
        calendar.push({
          day: dayIndex + 1,
          isCurrentMonth: true,
        });
        dayIndex++;
      } else {
        calendar.push({
          day: null,
          isCurrentMonth: false,
        });
      }
    }

    for (let week = 1; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        if (dayIndex < daysInMonth) {
          calendar.push({
            day: dayIndex + 1,
            isCurrentMonth: true,
          });
          dayIndex++;
        } else {
          calendar.push({
            day: null,
            isCurrentMonth: false,
          });
        }
      }
    }

    return calendar;
  };


  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

 
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Function to get events for a specific day
  const getEventsForDay = (day: number): Event[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.deadline);
      return eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });
  };


  const router = useRouter();


  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <Button onClick={prevMonth} size="icon" variant="ghost"><ChevronLeftIcon/> </Button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <Button onClick={nextMonth} size="icon" variant="ghost"><ChevronRightIcon/> </Button>

      </div>

      <div className="calendar-weekdays">
        
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div>Сб</div>
        <div>Вс</div>
      </div>

      <div className="calendar-grid">
        {generateCalendar().map((day, index) => (
          <div key={index} className={`calendar-cell ${day.isCurrentMonth ? '' : 'inactive'}`}>
              {day.day ? (
                <>
                  <span className="calendar-day">{day.day}</span>
                  { getEventsForDay(day.day).map((event, eventIndex) => (
                    <div key={eventIndex} onClick={() => router.push(`project/${event.on_board}/board`)} className={`calendar-event ${event.priority}`}>
                    {event.title}
                  </div>
                ))}
              </>
            ) : ( 
            <span className="calendar-empty"></span> 
            )
          }
        </div>
      ))}
    </div>
  </div>
);
};

export default Calendar;