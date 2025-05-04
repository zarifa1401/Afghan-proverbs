import type { NextApiRequest, NextApiResponse } from 'next';
import proverbs from '../../../data/proverbs.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const randomProverb = proverbs[Math.floor(Math.random() * proverbs.length)];
  res.status(200).json(randomProverb || {});
}