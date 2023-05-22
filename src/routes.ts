import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

import { FastifyInstance } from 'fastify'

const pump = promisify(pipeline)

export async function routes(app: FastifyInstance) {
  app.get('/', async function (request, reply) {
    const { file, name } = request.query as any

    const filepath = path.resolve(file)
    const filename = name ?? path.basename(filepath)
    const stats = fs.statSync(filepath)
    const fileSize = stats.size

    const stream = fs.createReadStream(filepath, 'utf8')

    reply.header('Content-Type', 'application/octet-stream')
    reply.header('Content-Length', fileSize)
    reply.header('Content-Disposition', `attachment; filename=${filename}`)

    return reply.send(stream)
  })

  app.post('/', async function (request, reply) {
    const { ext, temp } = request.query as any
    const upload = await request.file()

    if (!ext) {
      return reply.status(400).send({ error: 'Missing extension' })
    }

    if (!upload) return reply.status(400).send()

    const remove = Boolean(temp)

    const filepath = path.resolve(
      __dirname,
      '..',
      'temp',
      randomUUID().concat(ext),
    )

    const writableStream = fs.createWriteStream(filepath)

    await pump(upload.file, writableStream)

    if (remove) fs.unlinkSync(filepath)

    return {
      temp: remove,
    }
  })
}
