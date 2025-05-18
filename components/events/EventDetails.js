"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "../ui/Modal";

export default function EventDetail({ eventId }) {
  const [event, setEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        const data = await res.json();
        setEvent(data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    }

    if (eventId) fetchEvent();
  }, [eventId]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  const {
    title,
    description,
    location,
    startDate,
    endDate,
    category,
    images,
  } = event;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600">{description}</p>

      <div className="text-sm text-gray-500">
        <p><strong>Location:</strong> {location?.address}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Starts:</strong> {new Date(startDate).toLocaleString()}</p>
        <p><strong>Ends:</strong> {new Date(endDate).toLocaleString()}</p>
      </div>

      {images?.length > 0 && (
        <div className="flex gap-4 flex-wrap mt-4">
          {images.map((src, idx) => (
            <img key={idx} src={src} alt={`Event image ${idx}`} className="w-40 h-40 object-cover rounded" />
          ))}
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Register for Event
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register">
        <p>Registration form will go here.</p>
        {/* You can add registration logic here */}
      </Modal>
    </div>
  );
}
