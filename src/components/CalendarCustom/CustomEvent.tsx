import React from 'react';

// el componente CustomEvent es el que se encarga de mostrar los eventos en el calendario
// event brinda error en VS Code, pero no afecta el funcionamiento del componente
const CustomEvent = ({ event }) => {
  const maxLength = 25; // Maximum length of the event text
  const truncatedTitle = event.title.length > maxLength ? `${event.title.substring(0, maxLength)}...` : event.title;

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '1px 3px', borderRadius: '1px' }}>
      <span style={{ color: '#333', fontWeight: 'normal' }}>{truncatedTitle}</span>
    </div>
  );
};

export default CustomEvent;