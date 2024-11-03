// import React from 'react';

interface Event {
  start: string | Date;
  end: string | Date;
}

const CustomAgendaTime = ({ event }: { event: Event }) => {
  const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '4px' }}>
      <span style={{ color: '#333', fontWeight: 'bold', fontSize: '10px' }}>
        {startTime} - {endTime}
      </span>
    </div>
  );
};

export default CustomAgendaTime;