// import type { NextApiRequest, NextApiResponse } from 'next';
import proverbs from '../../../data/proverbs.json';

export default function handler(req: any, res: any) {
  const randomProverb = proverbs[Math.floor(Math.random() * proverbs.length)];
  res.status(200).json(randomProverb || {});
}