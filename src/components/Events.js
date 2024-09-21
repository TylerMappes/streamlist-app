import React, { useState, useEffect } from 'react'; // Import React and useState, useEffect hooks
import { v4 as uuidv4 } from 'uuid'; // Import UUID library to generate unique IDs for events
import './Events.css'; // Import the CSS file for styling

// Utility function to format the date correctly for display
const formatDate = (dateString) => {
  const date = new Date(dateString); // Create a new Date object from the provided date string
  date.setDate(date.getDate() + 1); // Adjust for timezone offset (some browsers may return a day off)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Convert month to two digits
  const day = String(date.getDate()).padStart(2, '0'); // Convert day to two digits
  const year = date.getFullYear(); // Get the full year
  return `${month}/${day}/${year}`; // Return formatted date in MM/DD/YYYY format
};

const Events = () => {
  // State hooks for managing input, date, events list, edit mode, and the current event being edited
  const [input, setInput] = useState(''); // For the event text input
  const [date, setDate] = useState(''); // For the event date input
  const [events, setEvents] = useState([]); // To hold the list of events
  const [isEditing, setIsEditing] = useState(false); // To check if the user is in editing mode
  const [currentEvent, setCurrentEvent] = useState(null); // To store the event currently being edited

  // Effect to load events from localStorage when the component first mounts
  useEffect(() => {
    // Retrieve the 'events' item from localStorage (saved as a JSON string)
    const storedEvents = localStorage.getItem('events');
    if (storedEvents && storedEvents !== '[]') {
      // If there are events in localStorage, parse and set them in the state
      console.log('Loading events from localStorage:', storedEvents);
      setEvents(JSON.parse(storedEvents)); // Convert JSON string back into an array
    } else {
      console.log('No events in localStorage'); // Log if no events were found in localStorage
    }
  }, []); // Empty dependency array means this effect runs only once, when the component is mounted

  // Effect to save events to localStorage whenever the `events` state changes
  useEffect(() => {
    // Only save events to localStorage if the array is not empty
    if (events.length > 0) {
      console.log('Saving events to localStorage:', events);
      localStorage.setItem('events', JSON.stringify(events)); // Convert the array to a JSON string
    }
  }, [events]); // Runs every time the `events` state changes

  // Handler for when the user types in the event input field
  const handleInputChange = (event) => setInput(event.target.value); // Update the `input` state with the value

  // Handler for when the user selects a date
  const handleDateChange = (event) => setDate(event.target.value); // Update the `date` state with the selected date

  // Function to add a new event to the events list
  const addEvent = () => {
    // Don't add if the input or date fields are empty
    if (input.trim() === '' || date.trim() === '') return;
    
    // Create a new event object with a unique ID, the input text, the date, and a completion status
    const newEvent = { id: uuidv4(), text: input, date, completed: false };
    
    // Add the new event to the existing array of events and reset the input fields
    setEvents([...events, newEvent]);
    setInput(''); // Clear the text input field
    setDate(''); // Clear the date input field
  };

  // Function to delete an event by its ID
  const deleteEvent = (id) => {
    // Filter out the event with the given ID from the events array
    const updatedEvents = events.filter((event) => event.id !== id);
    
    // Update the state with the filtered events array
    setEvents(updatedEvents);
  };

  // Function to start editing an existing event
  const editEvent = (event) => {
    setIsEditing(true); // Set editing mode to true
    setCurrentEvent(event); // Set the event being edited
    setInput(event.text); // Pre-fill the input field with the existing event text
    setDate(event.date); // Pre-fill the date field with the existing event date
  };

  // Function to save an edited event
  const saveEvent = () => {
    // Map over the events array and update the event being edited with new values
    setEvents(
      events.map((event) =>
        event.id === currentEvent.id ? { ...event, text: input, date } : event
      )
    );
    // Reset editing mode and clear the current event
    setIsEditing(false);
    setCurrentEvent(null);
    setInput(''); // Clear the input field after saving
    setDate(''); // Clear the date field after saving
  };

  // Function to mark an event as completed or uncompleted
  const completeEvent = (id) => {
    // Toggle the 'completed' status of the event with the given ID
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  return (
    <div className="events-container">
      <h2>Events Page</h2>

      {/* Input fields for adding or editing events */}
      <div className="events-input-container">
        <input
          type="text"
          id="event-input" // Add an id attribute
          name="event" // Add a name attribute
          placeholder="Enter event"
          value={input} // Bind the input field to the `input` state
          onChange={handleInputChange} // Update the `input` state on change
          className="events-input"
        />
        <input
          type="date"
          id="event-date" // Add an id attribute
          name="event-date" // Add a name attribute
          value={date} // Bind the date input to the `date` state
          onChange={handleDateChange} // Update the `date` state on change
          className="events-date-input"
        />
        {/* Button to either save or add an event depending on whether we're in edit mode */}
        <button onClick={isEditing ? saveEvent : addEvent} className="events-button">
          {isEditing ? 'Save' : 'Add'} {/* Show "Save" when editing, "Add" otherwise */}
        </button>
      </div>

      {/* Display the list of events */}
      <ul>
        {events.map((event) => (
          <li key={event.id} className={event.completed ? 'completed' : ''}>
            {/* Display the event text and date, format the date with the utility function */}
            <span className={event.completed ? 'event-text completed' : 'event-text'}>
              {event.text} - {formatDate(event.date)}
            </span>
            {/* Button to toggle event completion */}
            <button onClick={() => completeEvent(event.id)} className="events-button">
              {event.completed ? 'Unmark' : 'Complete'} {/* Toggle between "Complete" and "Unmark" */}
            </button>
            {/* Button to edit the event */}
            <button onClick={() => editEvent(event)} className="events-button">Edit</button>
            {/* Button to delete the event */}
            <button onClick={() => deleteEvent(event.id)} className="events-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events; // Export the component to be used in the app
