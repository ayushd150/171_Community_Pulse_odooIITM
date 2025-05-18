import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const handleApprove = async (id) => {
    await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' })
    });
    setEvents(events.map(e => e._id === id ? { ...e, status: 'approved' } : e));
  };

  const handleReject = async (id) => {
    await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' })
    });
    setEvents(events.map(e => e._id === id ? { ...e, status: 'rejected' } : e));
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
      {events.map(event => (
        <div key={event._id} className="border p-4 mb-2">
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p>Status: {event.status}</p>
          <div className="space-x-2 mt-2">
            <button onClick={() => handleApprove(event._id)} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
            <button onClick={() => handleReject(event._id)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
          </div>
        </div>
      ))}
    </Layout>
  );
}
