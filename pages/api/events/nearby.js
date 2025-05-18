import { getEventsNearby } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { lat, lng, radius = 10 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Missing location coordinates" });
  }

  const events = await getEventsNearby({ lat: parseFloat(lat), lng: parseFloat(lng), radius });

  res.status(200).json(events);
}
