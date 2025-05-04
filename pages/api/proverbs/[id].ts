import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import proverbs from '../../../data/proverbs.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;
  const index = proverbs.findIndex((p: any) => p.id === Number(id));

  if (index === -1) return res.status(404).json({ error: 'Proverb not found' });

  if (req.method === 'GET') {
    return res.status(200).json(proverbs[index]);
  }

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'PUT') {
    const updated = { ...proverbs[index], ...JSON.parse(req.body) };
    proverbs[index] = updated;
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    proverbs.splice(index, 1);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}