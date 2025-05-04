import type { NextApiRequest, NextApiResponse } from 'next';
import proverbs from '../../../data/proverbs.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const results = proverbs.filter((proverb: any) => 
    proverb.textDari.includes(q as string) || 
    proverb.textPashto.includes(q as string) || 
    proverb.translationEn.toLowerCase().includes((q as string).toLowerCase())
  );
  res.status(200).json(results);
}