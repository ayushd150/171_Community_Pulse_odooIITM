// GET, PUT, DELETE event by ID
import { supabase } from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json(data);
  }

  if (req.method === 'PUT') {
    const updatedData = req.body;
    const { data, error } = await supabase
      .from('events')
      .update(updatedData)
      .eq('id', id)
      .select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }
}
