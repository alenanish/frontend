import React, { useState, useEffect } from 'react';
import './calendar.css';


interface Event {
  date: string; 
  title: string;
  color: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

 
  const generateCalendar = (): { day: number | null; isCurrentMonth: boolean }[] => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = new Date(year, month, 1).getDay(); // 0 (Sunday) - 6 (Saturday)

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


  const getEventsForDay = (day: number): Event[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  // Sample event data
  useEffect(() => {
    setEvents([
      { date: '2024-03-15', title: 'Meeting with Client A', color: 'blue' },
      { date: '2024-03-22', title: 'Project Deadline', color: 'red' },
      { date: '2024-03-29', title: 'Team Lunch', color: 'green' },
    ]);
  }, []);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>Previous</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>

      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="calendar-grid">
        {generateCalendar().map((day, index) => (
          <div key={index} className={`calendar-cell ${day.isCurrentMonth ? '' : 'inactive'}`}>
            {day.day ? (
              <>
                <span className="calendar-day">{day.day}</span>
                {getEventsForDay(day.day).map((event, eventIndex) => (
                  <div key={eventIndex} className={`calendar-event ${event.color}`}>
                  {event.title}
                </div>
              ))}
            </>
          ) : (
            <span className="calendar-empty"></span>
          )}
        </div>
      ))}
    </div>
  </div>
);
};

export default Calendar;