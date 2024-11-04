// import React from 'react';

import React from 'react';

interface Event {
  event: {
    title: string;
  };
}


const CustomAgendaEvent: React.FC<Event> = ({ event })  => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '4px' }}>
      <span style={{ color: '#333', fontWeight: 'bold', fontSize: '10px' }}>{event.title}</span>
    </div>
  );
};

export default CustomAgendaEvent;