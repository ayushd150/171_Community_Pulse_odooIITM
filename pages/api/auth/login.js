import { getUserByEmail } from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({ id: user.id, isAdmin: user.isAdmin });

  res.status(200).json({ token, user: { ...user, password: undefined } });
}
