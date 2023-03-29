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
  const redis = Redis.fromEnv()

  const { url } = req.body
  const id = Math.random().toString(36).slice(2)
  await redis.set(id, url)
  res.status(200).json({ name: id })
}
