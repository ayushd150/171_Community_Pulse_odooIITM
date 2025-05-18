import React, { useEffect, useState } from 'react';
import EventList from '@/components/events/EventList';
import Layout from '@/components/layout/Layout';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">All Events</h1>
      <EventList events={events} />
    </Layout>
  );
}

