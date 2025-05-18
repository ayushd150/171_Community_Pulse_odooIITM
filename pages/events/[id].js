import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/app/services/supabaseClient";
import EventDetail from "@/components/events/EventDetail";
import Layout from "@/components/layout/Layout";

export default function EventDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching event:", error.message);
      } else {
        setEvent(data);
      }
      setLoading(false);
    }

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <p className="text-center mt-8">Loading event details...</p>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <p className="text-center mt-8 text-red-500">Event not found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <EventDetail event={event} />
    </Layout>
  );
}
