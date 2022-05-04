import express from 'express'

import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks.repository'
import { SubmitFeedbackServices } from './services/submit-feedback.services'
import { NodeMailerMailUtils } from './utils/nodemailer/nodemailer-mail.utils'

export const routes = express.Router()

routes.get('/', (request, response) => {
  response.send('hello')
})

routes.post('/feedback', async (request, response) => {
  const { type, comment, screenshot } = request.body

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodeMailerMailUtils = new NodeMailerMailUtils()
  const submitFeedbackServices = new SubmitFeedbackServices(
    prismaFeedbackRepository,
    nodeMailerMailUtils
  )

  await submitFeedbackServices.execute({
    type,
    comment,
    screenshot
  })

  response.status(201).json({ message: 'Feedback created successfully' })
})
