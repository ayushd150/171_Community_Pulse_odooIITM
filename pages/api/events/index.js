// GET: list events, POST: create new event
import { supabase } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('events').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { title, description, location, date } = req.body;
    const { data, error } = await supabase
      .from('events')
      .insert([{ title, description, location, date }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }
}
