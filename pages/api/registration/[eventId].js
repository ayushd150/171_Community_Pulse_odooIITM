import { registerForEvent } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    query: { eventId },
    body: { name, email, phone, attendeeCount, userId = null },
  } = req;

  const registration = await registerForEvent({
    eventId,
    name,
    email,
    phone,
    attendeeCount,
    userId,
  });

  res.status(201).json(registration);
}
