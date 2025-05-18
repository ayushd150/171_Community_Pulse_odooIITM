import { useRouter } from "next/router";
import EventForm from "../../../components/events/EventForm";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Edit Event</h2>
      <EventForm eventId={id} isEdit />
    </div>
  );
}