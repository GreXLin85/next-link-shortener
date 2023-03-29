// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ name: 'Method Not Allowed' })
    }
    
    const { id } = req.query
    
    if (typeof id !== 'string') {
        return res.status(400).json({ name: 'Invalid id' })
    }
    
    const redis = Redis.fromEnv()
    
    const link = await redis.get(id)
    
    if (!link) {
        return res.status(404).json({ name: 'Not found' })
    }
    
    // @ts-ignore
    return res.redirect(link)
}
