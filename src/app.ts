import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastify from 'fastify'

import { routes } from './routes'

export const app = fastify()

app.register(cors)
app.register(multipart, {
  limits: {
    fileSize: Infinity,
  },
})

app.register(routes)
