// import React from 'react';

interface CustomAgendaDateProps {
  label: string;
}

const CustomAgendaDate = ({ label }: CustomAgendaDateProps) => {
  return (
    <div style={{ color: '#555', fontSize: '12px', fontStyle: 'italic' }}>
      {label}
    </div>
  );
};

export default CustomAgendaDate;