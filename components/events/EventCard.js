import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-40">
        {event.images && event.images.length > 0 ? (
          <Image 
            src={event.images[0]} 
            alt={event.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
          {event.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{event.title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {formatDate(event.startDate)}
        </p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{event.location.address}</span>
          <Link href={`/events/${event.id}`}>
            <a className="text-sm text-blue-600 hover:underline">View details</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;