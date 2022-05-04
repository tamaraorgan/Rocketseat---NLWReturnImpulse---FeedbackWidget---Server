import { FeedbacksRepository } from '../repositories/feedbacks.repository'
import { MailUtils } from '../utils/mail.utils'

interface SubmitFeedbackServicesRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackServices {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailUtils: MailUtils
  ) {}

  async execute(request: SubmitFeedbackServicesRequest) {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error('Type is required.')
    }

    if (!comment) {
      throw new Error('Comment is required.')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
        throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailUtils.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`
      ].join('\n')
    })
  }
}
