import EventForm from "../../components/events/EventForm";
export default function NewEventPage() {
  return (
    <div className="px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>
      <EventForm />
    </div>
  );
}