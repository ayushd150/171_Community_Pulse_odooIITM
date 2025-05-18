import { createUser, getUserByEmail } from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, phone, password } = req.body;

  const existing = await getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({ name, email, phone, password: hashedPassword });

  const token = generateToken({ id: user.id, isAdmin: user.isAdmin });

  res.status(201).json({ token, user: { ...user, password: undefined } });
}
