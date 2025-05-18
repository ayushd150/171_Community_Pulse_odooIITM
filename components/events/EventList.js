import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <p className="text-center py-8">No events found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;