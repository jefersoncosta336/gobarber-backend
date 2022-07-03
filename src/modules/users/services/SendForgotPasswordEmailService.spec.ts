import AppError from '@shared/errors/AppError'

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUsersTokenRepository: FakeUserTokensRepository
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUsersTokenRepository = new FakeUserTokensRepository()

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepository,
    )
  })

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should be able to recover the password using the email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
