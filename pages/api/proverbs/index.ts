// import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import proverbs from '../../../data/proverbs.json';

export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    const { category } = req.query;
    const filtered = category 
      ? proverbs.filter((p: any) => p.category === category) 
      : proverbs;
    return res.status(200).json(filtered);
  }

  if (req.method === 'POST') {
    if (!session) return res.status(401).json({ error: 'Unauthorized' });
    const newProverb = { 
      id: proverbs.length + 1, 
      ...JSON.parse(req.body) 
    };
    proverbs.push(newProverb);
    return res.status(201).json(newProverb);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}