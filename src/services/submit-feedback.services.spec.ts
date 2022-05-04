import { SubmitFeedbackServices } from './submit-feedback.services'

const createFeedbackSpy = jest.fn()
const sendMailFeedbackSpy = jest.fn()

const submitFeedback = new SubmitFeedbackServices(
  { create: createFeedbackSpy },
  { sendMail: sendMailFeedbackSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,kheheladhfeasdjfei'
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailFeedbackSpy).toHaveBeenCalled()
  })

  it('should no be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,kheheladhfeasdjfei'
      })
    ).rejects.toThrow()
  })

  it('should no be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,kheheladhfeasdjfei'
      })
    ).rejects.toThrow()
  })

  it('should no be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data'
      })
    ).rejects.toThrow()
  })
})
