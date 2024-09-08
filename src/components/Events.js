
import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [input, setInput] = useState(''); // For the event name
  const [date, setDate] = useState(''); // For the event date
  const [events, setEvents] = useState([]); // List of events
  const [isEditing, setIsEditing] = useState(false); // Edit mode flag
  const [currentEvent, setCurrentEvent] = useState(null); // Track the event being edited

  // Handle input change for the event name
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Handle input change for the date
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Add new event
  const addEvent = () => {
    if (input.trim() === '' || date.trim() === '') return; // Prevent adding empty events
    setEvents([...events, { id: Date.now(), text: input, date }]);
    setInput('');
    setDate('');
  };

  // Delete an event
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Edit an event
  const editEvent = (event) => {
    setIsEditing(true);
    setCurrentEvent(event);
    setInput(event.text);
    setDate(event.date);
  };

  // Save edited event
  const saveEvent = () => {
    setEvents(
      events.map((event) =>
        event.id === currentEvent.id
          ? { ...event, text: input, date }
          : event
      )
    );
    setIsEditing(false);
    setCurrentEvent(null);
    setInput('');
    setDate('');
  };

  return (
    <div className="events-container">
      <h2>Events Page</h2>
      <input
        type="text"
        placeholder="Enter event"
        value={input}
        onChange={handleInputChange}
        className="events-input"
      />
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="events-date-input"
      />
      <button onClick={isEditing ? saveEvent : addEvent}>
        {isEditing ? 'Save' : 'Add'}
      </button>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.text} - {event.date}
            <button onClick={() => editEvent(event)}>Edit</button>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
