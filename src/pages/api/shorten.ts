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
  if (req.method !== 'POST') {
    return res.status(405).json({ name: 'Method Not Allowed' })
  }

  const { link } = req.body

  if (link.length > 2048) {
    return res.status(400).json({ name: 'Link too long' })
  }

  if (!new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g).test(link)) {
    return res.status(400).json({ name: 'Invalid link' })
  }

  const id = Math.random().toString(36).slice(2)

  const redis = Redis.fromEnv()

  await redis.set(id, link)

  return res.status(200).json({ name: id })
}
